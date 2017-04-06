import CostCalc from "./CostCalc";

/**
 * @author JXNS
 * 
 */
export default class CourseTemplate {

    /**
     * parse takes a course template object as returned by the api as 'data' and creates a valid teachingPeriod array.
     * Because of certain issues with the API's data integrity it is necessary to parse this data and catch any invalid 
     * pieces of data so the table is not corrupted. '
     */
    static parse(data, year) {
        let startYear = year;
        let newTeachingPeriods = [];
        let newCost = 0;
        let newCP = 0;
        let tmpArr = JSON.parse(data.teachingPeriods.value);
        let max = 4;
        
        // Currently the easiest way to check for overloading so we render the correct amount of teaching period unit slots
        // This loops through the units in the teaching periods and checks the credit point counts for each, the 
        for (let m=0; m < tmpArr.length; m++) {
            let item = tmpArr[m];
            let creditPointCount = item.units.reduce((prev, next) => {
                if (next.creditPoints === 0) {
                    return prev + 6;
                } else if (next.creditPoints) {
                    return prev + next.creditPoints;
                } else {
                    return prev;
                }
            }, 0);
            if(creditPointCount > (max * 6)){
                max = creditPointCount / 6;
            }
        }

        /**
         * Goes through each teaching period and if the number of units is 0, fills it with nulls.
         * If a unit is encountered, it loops through every unit and calculates the cost, updating the credit point and 
         * total cost values as well.
         */
        for (let i=0; i < tmpArr.length; i++) {
            let item = tmpArr[i];
            if (item.code){
                item.year = item.year += startYear;
                if (item.numberOfUnits === 0) {
                    item.units = new Array(max).fill(null);    
                } else {
                    for (let k=0; k < item.numberOfUnits; k++){
                        let unit = item.units[k];
                        unit.cost = CostCalc.calculateCost(unit.scaBand, unit.creditPoints);
                        newCost += unit.cost;
                        newCP += unit.creditPoints;
                    }
                    for(let j=0; j < max - item.numberOfUnits; j++){
                        item.units.push(null);
                    }
                }
                newTeachingPeriods.push(item);
            }
        }


        // result object contains all the data we want
        let result = {
            newTeachingPeriods: newTeachingPeriods,
            newCost: newCost,
            newCP: newCP,
            overLoadNumber: max
        };

        return result;
    }
}