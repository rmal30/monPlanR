/**
    * Gets the next semester in the list of teaching periods.
    *
    * @author Saurabh Joshi, JXNS
*/
export const nextSemester = (teachingPeriods, startYear, teachingPeriodData) => {
    const index = teachingPeriods.length;
    let year = startYear;

    const s1Code = "S1-01";
    const s2Code = "S2-01";

    let code = s1Code;

    if(!teachingPeriodData) {
        return { index, year, code };
    }

    if(index > 0) {
        const startIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
        const s1middleIndex = teachingPeriodData.findIndex(ele => ele.code === s1Code);
        const s2middleIndex = teachingPeriodData.findIndex(ele => ele.code === s2Code);
        year = teachingPeriods[index - 1].year;
        if(startIndex < s1middleIndex) {
            // do nothing
        } else if(startIndex < s2middleIndex) {
            code = s2Code;
        } else if(startIndex >= s1middleIndex) {
            year ++;
        }
    }

    return { index, year, code };
};

/**
 * @author Saurabh Joshi, JXNS
 */
export const getQuickSemesterString = (teachingPeriods, startYear, teachingPeriodData) =>  {
    const { year, code } = nextSemester(teachingPeriods, startYear, teachingPeriodData);

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

export const getSemesterString = (year, teachingPeriodData, code) => {
    
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