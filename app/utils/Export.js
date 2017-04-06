import fileDownload from "react-file-download";

export default {
    CSV: "CSV",
    JSON: "JSON",
    File(teachingPeriods, numberOfUnits, mode) {
        /**
        * The exporting to CSV code
        * @author Eric Jiang, Saurabh Joshi
        */
        switch(mode) {
            case this.CSV:
                var csvString = "Year, Teaching Period";

                for (var j = 0; j < numberOfUnits; j++) {
                    csvString += ",Unit" + (parseInt(j, 10)+1);
                }
                csvString += "\r\n";

                for (var i = 0; i < teachingPeriods.length; i ++) {
                    var teachingPeriod = teachingPeriods[i];
                    csvString += teachingPeriod.year + "," + teachingPeriod.code + ",";

                    var listofUnits = teachingPeriod.units;
                    for(var k = 0; k < numberOfUnits; k++) {
                        var unit = "";

                        if(listofUnits[k] === null || listofUnits[k] === undefined || listofUnits[k] === "") {
                            // do nothing
                        } else {
                            unit = listofUnits[k].unitCode;
                        }

                        csvString += unit + ",";
                    }

                    csvString += "\r\n";
                }

                fileDownload(csvString, "course-plan.csv");
                break;
            case this.JSON:
                /**
                 * Exports the course plan to JSON format and downloads it
                 */
                fileDownload(JSON.stringify({ teachingPeriods, numberOfUnits }), "course-plan.json");
        }
    }
};
