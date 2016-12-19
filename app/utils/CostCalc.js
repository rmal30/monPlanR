
/**
 * 
 */
export default class CostCalc {

    /**
     * 
     */
    static calculateCost(SCAband, creditPoints) {
        let scaMap = [0, 132, 188, 220] //sca band 1 through 3 maps to their per credit point cost
        let estCost = scaMap[SCAband] * creditPoints;
        return estCost;
    }

}