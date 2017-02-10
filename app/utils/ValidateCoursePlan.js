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
        ele.units.map((unit, unitIndex) => {
            if(unit) {
                return {
                    ...unit,
                    teachingPeriodIndex,
                    unitIndex
                };
            }
        }).filter(unit => unit)).reduce((units, list) => units.concat(list), []);
}

/**
 * Reads in course structure and returns a list of errors.
 *
 * @author JXNS, Saurabh Joshi
 * @param {array} teachingPeriods - Students' course plan
 * @return {array} - A list of errors
 */
export function validateCoursePlan(teachingPeriods) {
    // Finds duplicates
    const units = getListOfUnits(teachingPeriods).sort((a, b) => {
        a = a.UnitCode;
        b = b.UnitCode;

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
        ...duplicates(units),
        ...offerings(units, teachingPeriods)
    ];
}

/**
 * [teachingPeriodIndex, unitIndex]
 * If null is specified, then it highlights everything
 * e.g. [0, null] highlights all units in first teaching period
 * e.g. [null, 4] highlights all units in fourth Column
 * e.g. [null, null] highlights all units in course plan.
 */
export function getInvalidUnitSlotCoordinates(teachingPeriods, tempUnit, duplicateGraceFlag) {
    let duplicateFound = false;

    for(let i = 0; i < teachingPeriods.length; i++) {
        for(let j = 0; j < teachingPeriods[i].units.length; j++) {
            if(!duplicateFound) {
                if(teachingPeriods[i].units[j] && teachingPeriods[i].units[j].UnitCode === tempUnit.UnitCode && !teachingPeriods[i].units[j].placeholder) {
                    if(duplicateGraceFlag) {
                        duplicateGraceFlag = false;
                    } else {
                        // Found duplicate, invalidate all coordinates
                        duplicateFound = true;
                    }
                }
            }
        }
    }

    if(duplicateFound) {
        return [[null, null]];
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


    let offerings = tempUnit.LocationAndTime;

    if(!offerings) {
        return [];
    }

    const coordinates = [];

    for(let i = 0; i < teachingPeriods.length; i++) {

        const teachingPeriodStr = codeMap[teachingPeriods[i].code];

        if (teachingPeriodStr !== undefined) {
            // semester we're checking against is covered by mapping'
            let re = new RegExp(teachingPeriodStr);

            let isValid = false;

            for(let k = 0; k < offerings.length; k++) {
                let locations = offerings[k][1];
                if(!locations) {
                    continue;
                }

                for(let l = 0; l < locations.length; l++) {
                    let offering = locations[l];
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
 */
function duplicates(units) {
    const duplicateUnits = [];

    units.reduce((prevUnit, currentUnit) => {
        if(prevUnit && prevUnit.UnitCode === currentUnit.UnitCode && !prevUnit.placeholder) {
            const index = duplicateUnits.findIndex(unit => unit.UnitCode === currentUnit.UnitCode);

            if(index === -1) {
                duplicateUnits.push({
                    UnitCode: currentUnit.UnitCode,
                    coordinates: [[prevUnit.teachingPeriodIndex, prevUnit.unitIndex], [currentUnit.teachingPeriodIndex, currentUnit.unitIndex]]
                });
            } else {
                duplicateUnits[index].coordinates.push([currentUnit.teachingPeriodIndex, currentUnit.unitIndex]);
            }
        }

        return currentUnit;
    }, null);

    return duplicateUnits.map(duplicateUnit => {
        return {
            message: `${duplicateUnit.UnitCode} already exists in your course plan.`,
            coordinates: duplicateUnit.coordinates
        };
    });
}

/**
 * Checks to see if unit in a teaching period is being offered
 */
function offerings(units, teachingPeriods) {
    let codeMap = {
        "FY-01": "Full year",
        "S1-01": "First semester",
        "S2-01": "Second semester",
        "SSA-02": "Summer semester A",
        "SSB-01": "Summer semester B",
        "WS-01": "Winter semester"
    };

    const errors = [];

    for(let i = 0; i < units.length; i++) {
        let offerings = units[i].LocationAndTime;

        if(!offerings) {
            continue;
        }

        const teachingPeriodStr = codeMap[teachingPeriods[units[i].teachingPeriodIndex].code];

        if (teachingPeriodStr !== undefined) {
            // semester we're checking against is covered by mapping'
            let re = new RegExp(teachingPeriodStr);

            let isValid = false;

            for(let k = 0; k < offerings.length; k++) {
                let locations = offerings[k][1];
                if(!locations) {
                    continue;
                }

                for(let l = 0; l < locations.length; l++) {
                    let offering = locations[l];
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
                    message: `${units[i].UnitCode} is not offered in ${teachingPeriodStr ? teachingPeriodStr.toLowerCase() : "this teaching period"}`,
                    coordinates: [[units[i].teachingPeriodIndex, units[i].unitIndex]]
                });
            }
        }
    }

    return errors;
}
