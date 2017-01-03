import UnitQuery from "./UnitQuery";
import Fuse from "fuse.js";

/**
 * Fuzzy Search algorithm
 */
export default function fuzzy(searchTarget){
    var options = {
      include: ["score"],
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      findAllMatches: true,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys:["UnitCode", "UnitName"]
    };
    UnitQuery.getUnitCodeAndUnitNames().then(response => {
        let data = response.data;
        var fuse = new Fuse(data, options);
        var result = fuse.search(searchTarget);

        console.log(result);
    });

}
