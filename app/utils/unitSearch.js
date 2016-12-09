import axios from 'axios';

function getUnitCodeAndUnitNames(){
   return axios.get("../../data/units/simple.json")
}


export default getUnitCodeAndUnitNames