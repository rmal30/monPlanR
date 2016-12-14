export default class YearCalc {

    static getStartYearVals(initialVal){
        let min = parseInt(initialVal,10) - 10;
        let max = parseInt(initialVal,10) + 10;
        let validStartYears = [];

        for(var i=min; i <= max; i++){
            let val = i.toString()
            validStartYears.push(
                { text: i.toString(), value: i}
            )
        }
        return validStartYears;

    }

    static getEndYearVals(startYear){

        let min = parseInt(startYear, 10);
        let max = parseInt(startYear, 10) + 10;
        let validEndYears = [];

        for(var j=min; j <= max; j++){
            validEndYears.push(
                { text: j.toString(), value: j}
            )
        }
        return validEndYears;
    }

}