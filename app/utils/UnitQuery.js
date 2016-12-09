import axios from 'axios';

export default class UnitQuery {
    
    static getUnitCodeAndUnitNames(){
        return axios.get("../../data/units/simple.json")
    }

    static getExtendedUnitData(UnitCode){
       return axios.get("../../data/units/extended.json")
    }
}