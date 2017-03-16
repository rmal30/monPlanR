import Fuse from "fuse.js";

/**
 * @author Eric Jiang + Charles Campton
 */
export default class FuzzySearch {

    /**
     * locationFilter
     * @param {array} arrayToFilter - an array of units
     * @param (array) locationFilterSettings - an array of locations
     */
    static locationFilter(arrayToFilter, locationFilterSettings){
        if (locationFilterSettings.length === 0){
            return arrayToFilter;
        }
        return arrayToFilter.reduce((filteredByLocationArray, unit) => {
            let unitLocations = unit.locationAndTime;
            for (var i = 0; i < unitLocations.length; i++){
                let currentLocation = unitLocations[i].location;
                for(var j = 0; j < locationFilterSettings.length; j++){
                    if (locationFilterSettings[j].toString().toUpperCase().includes(currentLocation.toUpperCase())){
                        return filteredByLocationArray.concat(unit);
                    }
                }
            }
            return filteredByLocationArray;
        },[]);
    }
    /**
     * creditPointFilter
     * @param {array} arrayToFilter - an array of units
     * @param (array) creditPointFilter - an array of min and max values
     */
    static creditPointFilter(arrayToFilter, creditPointFilterSettings){
        if (creditPointFilterSettings.min === 0 && creditPointFilterSettings.max === 48){
            return arrayToFilter;
        }
        return arrayToFilter.reduce((filteredByCreditPointArray, unit) => {
            let unitCreditPoints = unit.creditPoints;
            if(unitCreditPoints >= creditPointFilterSettings.min && unitCreditPoints <= creditPointFilterSettings.max){
                return filteredByCreditPointArray.concat(unit);
            }
            return filteredByCreditPointArray;
        },[]);
    }
    /**
     * facultyFilter
     * @param {array} arrayToFilter - an array of units
     * @param (array) facultyFilterSettings - an array of faculties
     */
    static facultyFilter(arrayToFilter, facultyFilterSettings){
        if (facultyFilterSettings.length === 0){
            return arrayToFilter;
        }
        return arrayToFilter.reduce((filteredByFacultyArray, unit) => {
            let unitFaculty = unit.faculty;
            for (var i=0; i < arrayToFilter.length; i++){
                for(var j=0; j < facultyFilterSettings.length; j++){
                    let currentFaculty = facultyFilterSettings[j];
                    if (unitFaculty === currentFaculty){
                        return filteredByFacultyArray.concat(unit);
                    }
                }
            }
            return filteredByFacultyArray;
        },[]);
    }
    /**
     * teachingPeriodFilter
     * @param {array} arrayToFilter - an array of units
     * @param (array) teachingPeriodFilterSettings - an array of teaching periods
     */
    static teachingPeriodFilter(arrayToFilter, teachingPeriodFilterSettings){
        if (teachingPeriodFilterSettings.length === 0){
            return  arrayToFilter;
        }
        for(let g = 0; g<arrayToFilter.length; g++){
            console.log(arrayToFilter[g].locationAndTime[0].location);
        }

        return arrayToFilter.reduce((filteredByTeachingPeriodArray, unit) => {
            //if unit is not offered in this year, it has to be removed otherwise locationAndTime is undefined.
            if(!unit.locationAndTime[0].location.toLowerCase().includes("not offered")){
                for (var h = 0; h<unit.locationAndTime.length; h++){
                    let currentLocationAndTime = unit.locationAndTime[h];
                    for(var i = 0; i<currentLocationAndTime.time.length; i++){
                        let currentUnitTeachingPeriod = currentLocationAndTime.time[i].toLowerCase();
                        for(var j = 0; j<teachingPeriodFilterSettings.length; j++){
                            let currentTeachingPeriodSetting = teachingPeriodFilterSettings[j].toLowerCase();
                            if(currentUnitTeachingPeriod.includes(currentTeachingPeriodSetting)){
                                return filteredByTeachingPeriodArray.concat(unit);
                            }
                        }
                    }
                }
            }
            return filteredByTeachingPeriodArray;
        }, []);
    }


    /**
     * locationFilter
     * @param {array} arrayToFilter - an array of filter
     * @param {object} filterSettings - filter settings
     * (e.g. {"location": ["Clayton"],"creditPointRange": {"min": 12, "max":24}, "faculty": "Faculty of Medicine, Nursing and Health Sciences"});)
     */
    static filterResults(arrayToFilter, filterSettings){
        arrayToFilter = arrayToFilter.map((curVal) => {
            return curVal.item;
        });
        var locationFilteredArray = this.locationFilter(arrayToFilter, filterSettings.location);
        var creditPointFilteredArray = this.creditPointFilter(locationFilteredArray, filterSettings.creditPointRange);
        var facultyFilteredArray = this.facultyFilter(creditPointFilteredArray, filterSettings.faculty);
        var teachingPeriodFilteredArray = this.teachingPeriodFilter(facultyFilteredArray, filterSettings.teachingPeriod);
        return teachingPeriodFilteredArray;
    }

    /**
     * search takes in a number of params and returns an array of results from a fuzzy search backend.
     * Please note that these results return the score key so the actual results are accessed via results[index].item
     * @param {string} searchTarget - the string you are searching for against the data
     * @param {array} data - the array of objects that you are searching against, please note that these objects should all have keys from your searchKeys array
     * @param {integer} numberOfResults - the number of results you want to return
     * @param {array} searchKeys - an array of strings that should be attibutes of your data objects, these keys will be searched against in the data set for matches
     *                             to the searchTarget
     * @param {integer} distance - the distance (allows more accurate search)
     * @filter {array} filter - the Filter Array
     * e.g. {"location": ["Clayton"],"creditPointRange": {"min": 12, "max":24}, "faculty": ["Faculty of Medicine, Nursing and Health Sciences"]}
     */
    static search(searchTarget, data, numberOfResults, searchKeys, distance, filter) {
        if(searchTarget !== null || searchTarget !== "") {
            var options = {
                include: ["score"],
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: distance,
                findAllMatches: true,
                maxPatternLength: 128,
                minMatchCharLength: 1,
                keys: searchKeys
            };

            const fuse = new Fuse(data, options);
            //apply filter if filterArray is populated
            var results = fuse.search(searchTarget);
            if(filter){
                results = this.filterResults(results, filter);
            }

            const finalResults = results.slice(0, numberOfResults);
            return finalResults;
        }
        return [];
    }

}
