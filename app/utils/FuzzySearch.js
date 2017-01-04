import Fuse from "fuse.js";

/**
 * 
 */
export default class FuzzySearch {

    /**
     * Retrieves a list of units locally specifying only unit names and codes.
     */
    static searchCourses(searchTarget, data) {
        if(searchTarget !== null || searchTarget !== "") {
            var options = {
                include: ["score"],
                shouldSort: true,
                threshold: 0.5,
                location: 0,
                distance: 100,
                findAllMatches: true,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys:["courseCode", "courseName"]
            };

            const fuse = new Fuse(data, options);
            const results = fuse.search(searchTarget).slice(0, 7);
            return results;
        }
        
        return [];
    }

}