/**
 * @author JXNS
 * CostCalc will contain the group of functions as necessary for calculating unit costs.
 */
export default class CostCalc {

    /**
     * calculateCost returns the cost calculated based on SCA band and number of credit points
     * @param {number} SCAband - The SCA band associated with a unit (should be between 1 and 3)
     * @param {number} creditPoints - The number of credit points associated with a unit
     */
    static calculateCost(SCAband, creditPoints) {
        let scaMap = [0, 132, 188, 220]; //sca band 1 through 3 maps to their per credit point cost
        let estCost = scaMap[SCAband] * creditPoints;
        return estCost;
    }

}