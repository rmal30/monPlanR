import axios from "axios";
export default class UnitQuery {

    static getUnitCodeAndUnitNames(){
        return axios.get("../../data/units/simple.json");
    }

    static getExtendedUnitDataLocal(UnitCode){
        return axios.get("../../data/units/extended.json");
    }

    static getExtendedUnitData(nUnitCode){
        let qURL = "http://api.monplan.tech:3000/units/" + nUnitCode;
        return axios.get(qURL);
    }
}
