function generateStartYear(startYear, endYear){
    if(this.startYear < this.endYear){
        array = [];
        for(i = this.startYear; i <= this.endYear; i++) {
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
            array.append(object);
            array.append(object2);
        }
    }
    return array;
}
