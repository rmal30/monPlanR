import moment from "moment";
import rulesParser from "./rules.pegjs";

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
        ...offerings(unitsByPosition),
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
    const reNotOffered = new RegExp("Not Offered in [0-9]{4}");

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

            let year = 2017;

            for(let k = 0; k < offerings.length; k++) {
                const location = offerings[k].location;
                const times = offerings[k].time;
                if(!location || !times) {
                    continue;
                }

                if(reNotOffered.test(location)) {
                    year = parseInt(location.substring("Not Offered in ".length)) || year;
                    break;
                }

                for(let l = 0; l < times.length; l++) {
                    let offering = times[l];
                    let isMatch = re.test(offering);

                    const index = times[l].search(/[0-9]{4}/);
                    year = parseInt(times[l].substring(index, index + 4)) || year;

                    if(isMatch) {
                        isValid = true;
                        break;
                    }
                }
                if(isValid) {
                    break;
                }
            }

            if (!isValid && teachingPeriods[i].year === year) {
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
function offerings(unitsByPosition) {
    let codeMap = {
        "FY-01": "Full year",
        "S1-01": "First semester",
        "S2-01": "Second semester",
        "SSA-02": "Summer semester A",
        "SSB-01": "Summer semester B",
        "WS-01": "Winter semester"
    };

    const reNotOffered = new RegExp("Not Offered in [0-9]{4}");

    const errors = [];

    for(let i = 0; i < unitsByPosition.length; i++) {
        let offerings = unitsByPosition[i].locationAndTime;

        if(!offerings) {
            continue;
        }

        if(typeof offerings === "string") {
            offerings = JSON.parse(offerings);
        }

        const teachingPeriodStr = codeMap[unitsByPosition[i].teachingPeriodCode];

        if (teachingPeriodStr !== undefined) {
            // semester we're checking against is covered by mapping'
            let re = new RegExp(teachingPeriodStr);

            let isValid = false;
            let year = 2017;

            if(Array.isArray(offerings)) {
                for(let k = 0; k < offerings.length; k++) {
                    let location = offerings[k].location;
                    let times = offerings[k].time;
                    if(!location || !times) {
                        continue;
                    }

                    for(let l = 0; l < times.length; l++) {
                        let offering = times[l];
                        let isMatch = re.test(offering);
                        const index = times[l].search(/[0-9]{4}/);
                        year = parseInt(times[l].substring(index, index + 4)) || year;

                        if(isMatch) {
                            isValid = true;
                            break;
                        }
                    }
                    if(isValid) {
                        break;
                    }
                }

                if (!isValid && unitsByPosition[i].teachingPeriodYear === year) {
                    errors.push({
                        message: `${unitsByPosition[i].unitCode} is not offered in ${teachingPeriodStr ? teachingPeriodStr.toLowerCase() : "this teaching period"}, ${year}.`,
                        coordinates: [[unitsByPosition[i].teachingPeriodIndex, unitsByPosition[i].unitIndex]]
                    });
                }
            } else if(reNotOffered.test(offerings.location) && parseInt(offerings.location.substring("Not Offered in ".length)) === unitsByPosition[i].teachingPeriodYear) {
                errors.push({
                    message: `${unitsByPosition[i].unitCode} is not offered in ${year}.`,
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

    unitsByPosition.forEach(unit => {
        if(unit.rules && unit.rules.length > 0) {
            unit.rules.forEach(rule => {
                // Some rules are expired, and thus should not be considered when validating units
                if(rule.endDate && !moment(rule.endDate, "DD/MM/YYYY").isAfter(new Date())) {
                    return;
                }

                try {
                    const parseTree = rulesParser.parse(rule.ruleString);
                    let node = parseTree;
                    const nodeStack = [node];

                    while(nodeStack.length > 0) {
                        node = nodeStack[nodeStack.length - 1];

                        if(node.type === "OR" || node.type === "AND") {
                            if(!node.left.visited) {
                                nodeStack.push(node.left);
                            } else if(!node.right.visited) {
                                nodeStack.push(node.right);
                            } else {
                                node.visited = true;
                                if(node.type === "OR") {
                                    if(node.left.error && node.right.error) {
                                        node.error = {
                                            message: `${node.left.error.message}, or ${node.right.error.message}`,
                                            coordinates: [...node.left.error.coordinates, ...node.right.error.coordinates]
                                        };
                                    }
                                } else if(node.type === "AND") {
                                    if(node.left.error && node.right.error) {
                                        /**
                                         * Insert brackets to indicate precedence whenever necessary
                                         */
                                        if(node.left.type === "OR") {
                                            node.left.error.message = `(${node.left.error.message})`;
                                        }

                                        if(node.right.type === "OR") {
                                            node.right.error.message = `(${node.right.error.message})`;
                                        }

                                        node.error = {
                                            message: `${node.left.error.message}, and ${node.right.error.message}`,
                                            coordinates: [...node.left.error.coordinates, ...node.right.error.coordinates]
                                        };
                                    } else if(node.left.error) {
                                        node.error = node.left.error;
                                    } else if(node.right.error) {
                                        node.error = node.right.error;
                                    }
                                }

                                nodeStack.pop();
                                continue;
                            }
                        } else {
                            node.visited = true;
                            nodeStack.pop();
                        }

                        if(node.type === "TRUE") {
                            // Unconditionally true means that we don't need to process it any further
                            continue;
                        } else if(node.type === "FOR") {
                            // we can mutate node.expression as it is generated from scratch by the rulesParser
                            let currentNode = node.expression;
                            let for_stack = [currentNode];

                            // Use depth first search from left to right to traverse through the FOR expression
                            while(for_stack.length > 0) {
                                // Peek last element in stack
                                currentNode = for_stack[for_stack.length - 1];

                                switch(currentNode.type) {
                                    case "IN":
                                        if(currentNode.variable === "COURSE_CODE") {
                                            currentNode.visitDoBranch = courseCode && currentNode.list.indexOf(courseCode) > -1;

                                            if(currentNode.not) {
                                                currentNode.visitDoBranch = !currentNode.visitDoBranch;
                                            }
                                        }

                                        currentNode.visited = true;
                                        for_stack.pop();
                                        break;
                                    case "OR":
                                    case "AND":
                                        if(!currentNode.left.visited) {
                                            for_stack.push(currentNode.left);
                                        } else if(!currentNode.right.visited) {
                                            for_stack.push(currentNode.right);
                                        } else {
                                            currentNode.visited = true;

                                            if(currentNode.type === "AND") {
                                                currentNode.visitDoBranch = currentNode.left.visitDoBranch && currentNode.right.visitDoBranch;
                                            }

                                            if(currentNode.type === "OR") {
                                                currentNode.visitDoBranch = currentNode.left.visitDoBranch || currentNode.right.visitDoBranch;
                                            }

                                            for_stack.pop();
                                        }
                                        break;
                                    // if we don't understand anything, just leave the node alone
                                    default:
                                        currentNode.visited = true;
                                        for_stack.pop();
                                }
                            }

                            if(node.expression.visitDoBranch && !node.do.visited) {
                                // Visit do branch
                                nodeStack.push(node.do);
                            } else if(!node.otherwise.visited) {
                                // Visit otherwise branch
                                nodeStack.push(node.otherwise);
                            }
                        } else if(rule.ruleSummary === "PREREQ" || rule.ruleSummary === "PREREQ-IW") {
                            if(node.type === "PERMISSION_REQUIRED") {
                                node.error = {
                                    message: `you need permission to do ${unit.unitCode}`,
                                    coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                };
                            } else if(node.type === "PASSED_UNITS") {
                                let unitsLeft = node.number;
                                let unitCodes = [...node.list];

                                unitCodes = unitCodes.filter(unitCode => {
                                    const unitPreq = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                                    if(unitPreq) {
                                        if(unitPreq.teachingPeriodIndex >= unit.teachingPeriodIndex) {
                                            node.error = {
                                                message: `please move ${unitPreq.unitCode} to a teaching period before ${unit.unitCode}`,
                                                coordinates: [[unit.teachingPeriodIndex, unit.unitIndex], [unitPreq.teachingPeriodIndex, unitPreq.unitIndex]]
                                            };
                                        }

                                        unitsLeft --;
                                    }

                                    return !unitPreq;
                                });

                                if(unitsLeft > 0) {
                                    if(unitsLeft > 1) {
                                        node.error = {
                                            message: `you must complete ${unitsLeft} of these units before you can do ${unit.unitCode}: ${unitCodes.join(", ")}`,
                                            coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                        };
                                    } else {
                                        let finalOr = "";
                                        if(unitCodes.length > 1) {
                                            finalOr = " or " + unitCodes.pop();
                                        }

                                        node.error = {
                                            message: `you must complete ${unitCodes.join(", ")}${finalOr} before you can do ${unit.unitCode}`,
                                            coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                        };
                                    }
                                }
                            } else if(node.type === "MIN_CREDIT_POINTS") {
                                const { minCreditPoints } = node;
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
                                    node.error = {
                                        message: `you need ${minCreditPoints - creditPoints} more credit points before you can do ${unit.unitCode}`,
                                        coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                    };
                                }
                            }
                        } else if(rule.ruleSummary === "COREQ" || rule.ruleSummary === "COREQ-IW") {
                            //new RegExp("Any passed co-req \\(I/W\\) unit in ").test(ruleString)
                            if(node.type === "PASSED_COREQ_UNITS") {
                                let unitCodes = node.list;

                                let found = false;

                                unitCodes.forEach(unitCode => {
                                    const unitCoreq = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                                    if(unitCoreq) {
                                        if(!found && unitCoreq.teachingPeriodIndex > unit.teachingPeriodIndex) {
                                            node.error = {
                                                message: `please move ${unitCoreq.unitCode} to a teaching period before or in the same teaching period as ${unit.unitCode}`,
                                                coordinates: [[unit.teachingPeriodIndex, unit.unitIndex], [unitCoreq.teachingPeriodIndex, unitCoreq.unitIndex]]
                                            };
                                        }

                                        found = true;
                                    }
                                });

                                if(!found) {
                                    let finalOr = "";
                                    if(unitCodes.length > 1) {
                                        finalOr = " or " + unitCodes.pop();
                                    }
                                    node.error = {
                                        message: `you must complete ${unitCodes.join(", ")}${finalOr} before or whilst doing ${unit.unitCode}`,
                                        coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                    };
                                }
                            }
                        } else if(rule.ruleSummary === "INCOMP" || rule.ruleSummary === "INCOMP-IW") {
                            if(node.type === "INCOMPATIBLE_WITH") {
                                let unitCodes = node.list;

                                unitCodes.forEach(unitCode => {
                                    const unitProhib = unitsByPosition.find(otherUnit => otherUnit.unitCode === unitCode);

                                    if(unitProhib && unitProhib.teachingPeriodIndex <= unit.teachingPeriodIndex) {
                                        node.error = {
                                            message: `please remove ${unit.unitCode}, as completing ${unitProhib.unitCode} prohibits you from doing this unit`,
                                            coordinates: [[unit.teachingPeriodIndex, unit.unitIndex]]
                                        };
                                    }
                                });
                            }
                        }
                    }

                    if(node.error) {
                        node.error.message += ".";
                        node.error.message = node.error.message.charAt(0).toUpperCase() + node.error.message.substring(1);
                        errors.push(node.error);
                    }
                } catch(e) {
                    console.error(rule.ruleString, e);
                }
            });
        }
    });

    return errors;
}
