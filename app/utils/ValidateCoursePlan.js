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
 */
export default function validateCoursePlan(teachingPeriods) {
    let errors = [];

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

    const duplicateUnits = [];

    for(let i = 1; i < units.length; i++) {
        if(units[i - 1].UnitCode === units[i].UnitCode && !units[i - 1].placeholder) {
            const index = duplicateUnits.findIndex(unit => unit.UnitCode === units[i].UnitCode);
            if(index === -1) {
                duplicateUnits.push({
                    UnitCode: units[i].UnitCode,
                    coordinates: [[units[i - 1].teachingPeriodIndex, units[i - 1].unitIndex], [units[i].teachingPeriodIndex, units[i].unitIndex]]
                });
            } else {
                duplicateUnits[index].coordinates.push([units[i].teachingPeriodIndex, units[i].unitIndex]);
            }
        }
    }

    errors = errors.concat(duplicateUnits.map(duplicateUnit => {
        return {
            message: `${duplicateUnit.UnitCode} already exists in your course plan.`,
            coordinates: duplicateUnit.coordinates
        };
    }));

    // Check if unit in the teaching period is being offered
    let codeMap = {
        "FY-01": "Full year",
        "S1-01": "First semester",
        "S2-01": "Second semester",
        "SSA-02": "Summer semester A",
        "SSB-01": "Summer semester B",
        "WS-01": "Winter semester"
    };

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
