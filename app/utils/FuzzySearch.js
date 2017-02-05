import Fuse from "fuse.js";

/**
 * @author JXNS
 */
export default class FuzzySearch {

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
     */
    static search(searchTarget, data, numberOfResults, searchKeys, distance) {
        if(searchTarget !== null || searchTarget !== "") {
            var options = {
                include: ["score"],
                shouldSort: true,
                threshold: 0.5,
                location: 0,
                distance: distance,
                findAllMatches: true,
                maxPatternLength: 128,
                minMatchCharLength: 1,
                keys: searchKeys
            };

            const fuse = new Fuse(data, options);
            const results = fuse.search(searchTarget).slice(0, numberOfResults);

            return results;
        }

        return [];
    }

}
