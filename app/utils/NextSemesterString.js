/**
    * Gets the next semester in the list of teaching periods.
    *
    * @author Saurabh Joshi, JXNS
*/
export const nextSemester = (teachingPeriods, startYear, teachingPeriodData) => {
    const { length } = teachingPeriods;
    let year = startYear;

    const s1Code = "S1-01";
    const s2Code = "S2-01";

    let code = s1Code;

    if(length > 0) {
        if(teachingPeriodData) {
            const startIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[length - 1].code);
            const s1middleIndex = teachingPeriodData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodData.findIndex(ele => ele.code === s2Code);

            // Get year from the last teaching period
            year = teachingPeriods[length - 1].year;

            if(startIndex >= s1middleIndex) {
                if(startIndex < s2middleIndex) {
                    code = s2Code;
                } else {
                    year ++;
                }
            }
        } else {
            // Get year and code from last teaching period
            year = teachingPeriods[length - 1].year;
            code = teachingPeriods[length - 1].code;

            if(code === s1Code) {
                code = s2Code;
            } else {
                // We don't know if there is a semester two missing if we don't have the teaching periods data
                year ++;
                code = s1Code;
            }
        }
    }

    return { index: length, year, code, teachingPeriodData };
};

/**
 * generates any semester string given a year and a teaching period code to check teachingperioddata against
 * @author Saurabh Joshi, JXNS
 */
export const getSemesterString = ({ year, teachingPeriodData, code }) => {

    let teachingPeriodName = code;

    if(teachingPeriodData) {
        const teachingPeriod = teachingPeriodData.find((element) =>
            element.code === code
        );

        if(teachingPeriod !== undefined) {
            teachingPeriodName = teachingPeriod.name || code;
        }
    }

    return `${teachingPeriodName}, ${year}`;
};
