import CostCalc from "./CostCalc";

/**
 * @author JXNS
 * 
 */
export default class CourseTemplate {

    /**
     * 
     */
    static parse(data) {
        let newTeachingPeriods = [];
        let newCost = 0;
        let newCP = 0;
        let tmpArr = data.teachingPeriods;
        let max = 4;
        
        for (let m=0; m < tmpArr.length; m++) {
            let item = tmpArr[m];
            if (item.numberOfUnits > max){
                max = item.numberOfUnits;
            }
        }

        for (let i=0; i < tmpArr.length; i++) {
            console.log("hello")
            let item = tmpArr[i];
            if (item.code){
                if (item.numberOfUnits === 0) {
                    item.units = new Array(4).fill(null);    
                } else {
                    for (let k=0; k < item.numberOfUnits; k++){
                        let unit = item.units[k];
                        unit.Cost = CostCalc.calculateCost(unit.SCABand, unit.CreditPoints);
                        newCost += unit.Cost;
                        newCP += unit.CreditPoints;
                    }
                    for(let j=0; j < max - item.numberOfUnits; j++){
                        item.units.push(null);
                    }
                }
                newTeachingPeriods.push(item)
            }
        }

        let result = {
            newTeachingPeriods: newTeachingPeriods,
            newCost: newCost,
            newCP: newCP,
            overLoadNumber: max
        }

        return result;
    }
}