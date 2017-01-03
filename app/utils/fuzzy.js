import Fuse from "fuse.js";

/**
 * Fuzzy Search algorithm
 */
export default function fuzzy(searchTarget, data) {
    var options = {
        include: ["score"],
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        findAllMatches: true,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys:["UnitCode", "UnitName"]
    };

    var fuse = new Fuse(data, options);
    let result = fuse.search(searchTarget).slice(0, 5);
    return result;
}
