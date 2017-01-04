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
        console.log(data);

        let newTeachingPeriods = [];
        let newCost = 0;
        let newCP = 0;
        let tmpArr = data.teachingPeriods;
        console.log(tmpArr)
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
                        console.log("---" + unit.UnitCode + "---");
                        newCost += unit.Cost;
                        newCP += unit.CreditPoints;
                        console.log("Cost: " + newCost);
                        console.log("CP: " + newCP);
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
        //let scaMap = [0, 132, 188, 220]; //sca band 1 through 3 maps to their per credit point cost
        //let estCost = scaMap[SCAband] * creditPoints;
        return result;
    }
}