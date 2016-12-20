import axios from "axios";

/**
 * A list of helper methods for unit queries.
 */
export default class UnitQuery {

    /**
     * Retrieves a list of units locally specifying only unit names and codes.
     */
    static getUnitCodeAndUnitNames() {
        return axios.get("../../data/units/simple.json");
    }

    /**
     * Retrieves a list of units locally with more detailed information.
     */
    static getExtendedUnitDataLocal() {
        return axios.get("../../data/units/extended.json");
    }

    /**
     * Retrieves information about a single unit remotely.

     * @param {string} UnitCode - The unit code to retrieve more information about.
     */
    static getExtendedUnitData(UnitCode) {
        let qURL = `${MONPLAN_REMOTE_URL}/units/${UnitCode}`;
        return axios.get(qURL);
    }

    /**
     * Currently using new API so this is not necessary
     */
    static getOldUnitData(nUnitCode){
        let qURL = "http://api.monplan.tech:3000/v0.2/" + nUnitCode;
        return axios.get(qURL);
    }
}
