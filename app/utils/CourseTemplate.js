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
        let tmpArr = data.teachingPeriods;
        for(let i=0; i < tmpArr.length; i++) {
            let item = tmpArr[i];
            if (item.code){
                if (item.numberOfUnits === 0) {
                    item.units = new Array(4).fill(null);    
                } else {
                    for(let j=0; j < 4 - item.numberOfUnits; j++){
                        item.units.push(null);
                    }
                }
                newTeachingPeriods.push(item)
            }
        }
        //let scaMap = [0, 132, 188, 220]; //sca band 1 through 3 maps to their per credit point cost
        //let estCost = scaMap[SCAband] * creditPoints;
        return newTeachingPeriods;
    }
}