import Fuse from "fuse.js";

/**
 * @author JXNS
 */
export default class FuzzySearch {

    /**
    *
    */
    static teachingPeriodsFilter(locationModeArray, teachingPeriodsFilterSettings){
        if(locationModeArray.length > 0){
            // iterate over the location and mode array
            for(var i = 0; i < locationModeArray.length; i++){
                // this is really bad O(n^3 algorithm now)
                var locationData = locationModeArray[i];
                for(var j = 0; j < locationData.time.length; i++){
                    if(teachingPeriodsFilterSettings.indexOf(locationData.time[i]) > -1){
                        return true;
                    }
                }
            }
            //exit here because just if one location doesnt have any
            //matching TP, means that other can have it in another TP
            return false;
        }
        // tells it to ignore the filter if the location and mode array is empty
        return true;
    }

    /**
     * creditPointsFilter
     * @param (integer) value - the credit Points value
     * @param {object} filterSettings - {"min": value, "max": value}
     */
    static creditPointsFilter(value, filterSettings){
        if(filterSettings.min <= value && value <= filterSettings.max){
            return true;
        }
        return false;
    }

    /**
     * facultyFilter
     * @param {string} - faculty string
     * @param (array) facultyFilterSettings - an array of faculties
     */
    static facultyFilter(faculty, facultyFilterSettings){
        if(faculty.length > 1){
            for(var i=0; i < faculty.length; i++){
                // this strategy is used, because there is only 1 faculty for 1 unit
                var facultyName = "Faculty of" + faculty;
                if(facultyFilterSettings.indexOf(facultyName) > -1){
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    /**
     * locationFilter
     * @param {array} locationArray - an array of filter
     * @param (array) locationFilterSettings - an array of locations
     */
    static locationFilter(locationArray, locationFilterSettings){
        if(locationArray.length > 1){
            for(var i=0; i < locationArray.length; i++){
                if(locationFilterSettings.indexOf(locationArray[i].location) > -1){
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    /**
     * locationFilter
     * @param {array} arrayToFilter - an array of filter
     * @param {object} filterSettings - filter settings
     * (e.g. {"location": ["Clayton"],"creditPointRange": {"min": 12, "max":24}, "faculty": "Faculty of Medicine, Nursing and Health Sciences"});)
     */
    static filterResults(arrayToFilter, filterSettings){
        var returnArray = [];
        for(var i=0; i < arrayToFilter.length; i++){
            var currentItem = arrayToFilter[i].item;
            if(this.locationFilter(currentItem.locationAndTime,filterSettings.location)
                && this.creditPointsFilter(currentItem.creditPoints, filterSettings.creditPointRange)
                && this.facultyFilter(currentItem.faculty, filterSettings.faculty)){
                returnArray.push(arrayToFilter[i]);
            }
        }
        return returnArray;
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
