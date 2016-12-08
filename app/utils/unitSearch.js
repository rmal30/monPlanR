import axios from 'axios';

function getUnitData(){
    axios.get("../../data/courses/bachelors.json")
    .then(function(response) {
        return response.data;
        
    })
    .catch(function(error) {
        console.log(error);
    })
}

export default getUnitData