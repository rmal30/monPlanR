import React, { Component } from "react";

class genCourse extends Component {
    constructor(startYear,endYear) {
        super(startYear,endYear);
    }

    generateCourse(startYear, endYear){
        if(startYear < endYear){
            var arr = [];
            for(i = startYear; i <= endYear; i++) {
                var object = {
                    year: i,
                    type: "S1-01",
                    numberOfUnits: 4,
                    units: [null,null,null,null]
                };
                var object2 = {
                    year: i,
                    type: "S2-02",
                    numberOfUnits: 4,
                    units: [null,null,null,null]
                };
                arr.push(object);
                arr.push(object2);
            }
        }
        return arr;
    }

    render(){
        return generateCourse(this.startYear,this.endYear);
    }
}

export default genCourse;
