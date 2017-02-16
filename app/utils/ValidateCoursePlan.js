import moment from "moment";

/**
 * Returns a list of units from the course structure
 *
 * @author Saurabh Joshi
 * @param {object} teachingPeriods - List of teaching periods containing the
 * units.
 * @returns {array}
 */
function getListOfUnits(teachingPeriods) {
    return teachingPeriods.map((ele, teachingPeriodIndex) =>
        ele.units
            .map((unit, unitIndex) => {
                if(unit && !unit.placeholder) {
                    return {
                        ...unit,
                        teachingPeriodIndex,
                        teachingPeriodCode: ele.code,
                        teachingPeriodYear: ele.year,
                        unitIndex
                    };
                }
            })
            .filter(unit => unit) // Remove free and  placeholder units
        ).reduce((units, list) => units.concat(list), []);
}

/**
 * Reads in course structure and returns a list of errors.
 *
 * @author JXNS, Saurabh Joshi
 * @param {array} teachingPeriods - Students' course plan
 * @param {string} courseCode - The course code of the student's course they're in
 * @return {array} - A list of errors
 */
export function validateCoursePlan(teachingPeriods, courseCode) {
    const unitsByPosition = getListOfUnits(teachingPeriods);
    const unitsByCode = unitsByPosition.sort((a, b) => {
        a = a.unitCode;
        b = b.unitCode;

        // Use unicode comparison
        if(a < b) {
            return -1;
        } else if(a === b) {
            return 0;
        } else {
            return 1;
        }
    });

    return [
        ...duplicates(unitsByCode),
        ...offerings(unitsByPosition, teachingPeriods),
        ...rules(unitsByPosition, courseCode)
    ];
}

/**
 * [teachingPeriodIndex, unitIndex]
 * If null is specified, then it highlights everything
 * e.g. [0, null] highlights all units in first teaching period
 * e.g. [null, 4] highlights all units in fourth Column
 * e.g. [null, null] highlights all units in course plan.
 */
export function getInvalidUnitSlotCoordinates(teachingPeriods, tempUnit, ignoreCoordinate) {
    let duplicateFound = false;
    const nextYear = new Date().getFullYear() + 1;
    const coordinates = [];

    const unitsByCode = getListOfUnits(teachingPeriods);

    unitsByCode.forEach(unit => {
        if(unit.unitCode === tempUnit.unitCode && (!ignoreCoordinate || !(ignoreCoordinate[0] === unit.teachingPeriodIndex && ignoreCoordinate[1] === unit.unitIndex))) {
            // Found duplicate
            duplicateFound = true;

            coordinates.push([unit.teachingPeriodIndex, null]);

        }
    });

    if(duplicateFound) {
        for(let i = 0; i < teachingPeriods.length; i++) {
            if(teachingPeriods[i].year > nextYear) {
                coordinates.push([i, null]);
            }
        }
    }

    // Check if unit in the teaching period is being offered
    let codeMap = {
        "FY-01": "Full year",
        "S1-01": "First semester",
        "S2-01": "Second semester",
        "SSA-02": "Summer semester A",
        "SSB-01": "Summer semester B",
        "WS-01": "Winter semester"
    };


    let offerings = tempUnit.locationAndTime;

    if(!offerings) {
        return coordinates;
    }

    if(typeof offerings === "string") {
        offerings = JSON.parse(offerings);
    }

    for(let i = 0; i < teachingPeriods.length; i++) {

        const teachingPeriodStr = codeMap[teachingPeriods[i].code];

        if (teachingPeriodStr !== undefined) {
            // semester we're checking against is covered by mapping'
            let re = new RegExp(teachingPeriodStr);

            let isValid = false;

            for(let k = 0; k < offerings.length; k++) {
                const location = offerings[k].location;
                const times = offerings[k].time;
                if(!location || !times) {
                    continue;
                }

                for(let l = 0; l < times.length; l++) {
                    let offering = times[l];
                    let isMatch = re.test(offering);

                    if(isMatch) {
                        isValid = true;
                        break;
                    }
                }
                if(isValid) {
                    break;
                }
            }

            if (!isValid) {
                coordinates.push([i, null]);
            }
        }
    }

    return coordinates;
}

/**
 * Checks to see if there are any duplicate units in the course plan.
 *
 * @param {array} unitsByCode - Units sorted by code, so that it can check for
 * duplicates correctly.
 */
function duplicates(unitsByCode) {
    const duplicateUnitsFutureTeachingPeriods = [];
    const duplicateUnitsSameTeachingPeriods = [];
    const nextYear = new Date().getFullYear() + 1;

    unitsByCode.reduce((prevUnit, currentUnit) => {
        if(prevUnit && prevUnit.unitCode === currentUnit.unitCode) {
            const earlierUnit = prevUnit.teachingPeriodIndex < currentUnit.teachingPeriodIndex ? prevUnit : currentUnit;
            const laterUnit = prevUnit.teachingPeriodIndex > currentUnit.teachingPeriodIndex ? prevUnit : currentUnit;

            if(earlierUnit.teachingPeriodYear > nextYear || laterUnit.teachingPeriodYear > nextYear) {
                const index = duplicateUnitsFutureTeachingPeriods.findIndex(unit => unit.unitCode === laterUnit.unitCode);

                if(index === -1) {
                    duplicateUnitsFutureTeachingPeriods.push({
                        message: `${currentUnit.unitCode} already exists in your course plan. Please plan as if you will pass all units.`,
                        coordinates: [[laterUnit.teachingPeriodIndex, laterUnit.unitIndex]]
                    });
                } else {
                    if(earlierUnit.teachingPeriodYear > nextYear) {
                        duplicateUnitsFutureTeachingPeriods[index].coordinates.push([earlierUnit.teachingPeriodIndex, earlierUnit.unitIndex]);
                    }
                    if(laterUnit.teachingPeriodYear > nextYear) {
                        duplicateUnitsFutureTeachingPeriods[index].coordinates.push([laterUnit.teachingPeriodIndex, laterUnit.unitIndex]);
                    }
                }
            }

            if(prevUnit.teachingPeriodIndex === currentUnit.teachingPeriodIndex) {
                const index = duplicateUnitsSameTeachingPeriods.findIndex(unit => unit.unitCode === currentUnit.unitCode);

                if(index === -1) {
                    duplicateUnitsSameTeachingPeriods.push({
                        message: `${currentUnit.unitCode} already exists in the same teaching period. Please remove this unit.`,
                        coordinates: [[currentUnit.teachingPeriodIndex, currentUnit.unitIndex]]
                    });
                } else {
                    duplicateUnitsSameTeachingPeriods[index].coordinates.push([currentUnit.teachingPeriodIndex, currentUnit.unitIndex]);
                }
            }
        }

        return currentUnit;
    }, null);

    return [...duplicateUnitsFutureTeachingPeriods, ...duplicateUnitsSameTeachingPeriods];
}

/**
 * Checks to see if unit in a teaching period is being offered
 */
function offerings(unitsByPosition, teachingPeriods) {
    let codeMap = {
        "FY-01": "Full year",
        "S1-01": "First semester",
        "S2-01": "Second semester",
        "SSA-02": "Summer semester A",
        "SSB-01": "Summer semester B",
        "WS-01": "Winter semester"
    };

    const errors = [];

    for(let i = 0; i < unitsByPosition.length; i++) {
        let offerings = unitsByPosition[i].locationAndTime;

        if(!offerings) {
            continue;
        }

        if(typeof offerings === "string") {
            offerings = JSON.parse(offerings);
        }

        const teachingPeriodStr = codeMap[teachingPeriods[unitsByPosition[i].teachingPeriodIndex].code];

        if (teachingPeriodStr !== undefined) {
            // semester we're checking against is covered by mapping'
            let re = new RegExp(teachingPeriodStr);

            let isValid = false;

            for(let k = 0; k < offerings.length; k++) {
                let location = offerings[k].location;
                let times = offerings[k].time;
                if(!location || !times) {
                    continue;
                }

                for(let l = 0; l < times.length; l++) {
                    let offering = times[l];
                    let isMatch = re.test(offering);

                    if(isMatch) {
                        isValid = true;
                        break;
                    }
                }
                if(isValid) {
                    break;
                }
            }

            if (!isValid) {
                errors.push({
                    message: `${unitsByPosition[i].unitCode} is not offered in ${teachingPeriodStr ? teachingPeriodStr.toLowerCase() : "this teaching period"}.`,
                    coordinates: [[unitsByPosition[i].teachingPeriodIndex, unitsByPosition[i].unitIndex]]
                });
            }
        }
    }

    return errors;
}

/**
 * Parses rules, such as prereqs, coreqs and prohib
 */
function rules(unitsByPosition, courseCode) {
    const errors = [];
    const noPermission = new RegExp("Permission required");
    unitsByPosition.forEach(unit => {
        if(unit.rules && unit.rules.length > 0) {
            unit.rules.forEach(rule => {
                // Some rules are expired, and thus should not be considered when validating units
                if(rule.endDate && !moment(rule.endDate, "DD/MM/YYYY").isAfter(new Date())) {
                    return;
                }

                let ruleString = rule.ruleString;

                if(new RegExp(" (AND|or) ").test(ruleString)) {
                    // Ignore logical expressions for now
                    return;
                }

                // in case the while loop goes on forever, force exit if it exceeds maxIterations
                let maxIterations = 100;

                while(new RegExp("For COURSE_CODE IN {.+}").test(ruleString)) {
                    maxIterations--;
                    if(maxIterations <= 0) {
                        console.error("Exceeded maximum iterations. Breaking out of while loop.");
                        break;
                    }

                    ruleString = ruleString.replace("For COURSE_CODE IN ", "");

                    if(!courseCode) {
                        // go straight to otherwise branch.
                        ruleString = ruleString.substring(ruleString.indexOf("Otherwise ") + "Otherwise ".length);
                        continue;
                    }

                    const courseCodes = ruleString.substring(ruleString.indexOf("{") + 1, ruleString.indexOf("}")).split(", ");

                    if(courseCode && courseCodes.find(otherCourseCode => courseCode === otherCourseCode)) {
                        // evaluate do branch.
                        ruleString = ruleString.substring(ruleString.indexOf("}") + 1).replace(" Do ", "").substring(0, ruleString.indexOf(" Otherwise"));
                    } else {
                        // evaluate otherwise branch.
                        ruleString = ruleString.substring(ruleString.indexOf("Otherwise ") + "Otherwise ".length);
                    }
                }

                if(rule.ruleSummary === "PREREQ" || rule.ruleSummary === "PREREQ-IW") {
                    if(noPermission.test(ruleString)) {
                        errors.push({
                            message: `You need permission to do ${unit.unitCode}.`,
                            coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                        });
                    } else if(new RegExp("Must have passed (an|1) \\(I/W\\) units? in ").test(ruleString)) {
                        ruleString = ruleString.substring(ruleString.indexOf("Must have passed an (I/W) unit in ") + "Must have passed an (I/W) unit in ".length);
                        ruleString = ruleString.substring(ruleString.indexOf("{") + 1, ruleString.indexOf("}"));
                        ruleString = ruleString.split(", ");

                        let found = false;

                        ruleString.forEach(unitCode => {
                            const unitPreq = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                            if(unitPreq) {
                                if(!found && unitPreq.teachingPeriodIndex >= unit.teachingPeriodIndex) {
                                    errors.push({
                                        message: `Please move ${unitPreq.unitCode} to a teaching period before ${unit.unitCode}.`,
                                        coordinates: [[unit.teachingPeriodIndex, unit.unitIndex], [unitPreq.teachingPeriodIndex, unitPreq.unitIndex]]
                                    });
                                }

                                found = true;
                            }
                        });

                        if(!found) {
                            let finalOr = "";
                            if(ruleString.length > 1) {
                                finalOr = " or " + ruleString.pop();
                            }
                            errors.push({
                                message: `You must complete ${ruleString.join(", ")}${finalOr} before you can do ${unit.unitCode}.`,
                                coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                            });
                        }
                    } else if(new RegExp("Must have passed [0-9]+ (\\(I/W\\) )?credit points?").test(ruleString)) {
                        ruleString = ruleString.replace("Must have passed ", "");
                        const minCreditPoints = parseInt(ruleString);
                        if(!minCreditPoints) {
                            return;
                        }

                        let creditPoints = 0;

                        unitsByPosition.forEach(otherUnit => {
                            if(otherUnit.teachingPeriodIndex < unit.teachingPeriodIndex) {
                                creditPoints += otherUnit.creditPoints || 0;
                            }
                        });

                        if(creditPoints < minCreditPoints) {
                            errors.push({
                                message: `You need ${minCreditPoints - creditPoints} more credit points before doing ${unit.unitCode}.`,
                                coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                            });
                        }
                    }
                } else if(rule.ruleSummary === "COREQ" || rule.ruleSummary === "COREQ-IW") {
                    if(new RegExp("Any passed co-req \\(I/W\\) unit in ").test(ruleString)) {
                        ruleString = ruleString.substring(ruleString.indexOf("Any passed co-req (I/W) unit in ") + "Any passed co-req (I/W) unit in ".length);
                        ruleString = ruleString.substring(ruleString.indexOf("{") + 1, ruleString.indexOf("}"));
                        ruleString = ruleString.split(", ");

                        let found = false;

                        ruleString.forEach(unitCode => {
                            const unitCoreq = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                            if(unitCoreq) {
                                if(!found && unitCoreq.teachingPeriodIndex > unit.teachingPeriodIndex) {
                                    errors.push({
                                        message: `Please move ${unitCoreq.unitCode} to a teaching period before or in the same teaching period as ${unit.unitCode}.`,
                                        coordinates: [[unit.teachingPeriodIndex, unit.unitIndex], [unitCoreq.teachingPeriodIndex, unitCoreq.unitIndex]]
                                    });
                                }

                                found = true;
                            }
                        });

                        if(!found) {
                            let finalOr = "";
                            if(ruleString.length > 1) {
                                finalOr = "or " + ruleString.pop();
                            }
                            errors.push({
                                message: `You must complete ${ruleString.join(", ")} ${finalOr} before or whilst doing ${unit.unitCode}.`,
                                coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                            });
                        }
                    }
                } else if(rule.ruleSummary === "INCOMP" || rule.ruleSummary === "INCOMP-IW") {
                    if(new RegExp("Incompatible with achievement in (\\(I/W\\) )?").test(ruleString)) {
                        ruleString = ruleString.substring(ruleString.indexOf("Incompatible with achievement in ") + "Incompatible with achievement in ".length);
                        ruleString.replace("(I/W) ", "");
                        ruleString = ruleString.substring(ruleString.indexOf("{") + 1, ruleString.indexOf("}"));
                        ruleString = ruleString.split(", ");

                        ruleString.forEach(unitCode => {
                            const unitProhib = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                            if(unitProhib && unitProhib.teachingPeriodIndex <= unit.teachingPeriodIndex) {
                                errors.push({
                                    message: `Please remove ${unit.unitCode}, as completing ${unitProhib.unitCode} prohibits you from doing this unit.`,
                                    coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                });
                            }
                        });
                    }
                }
            });
        }
    });

    return errors;
}
