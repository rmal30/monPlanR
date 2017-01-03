import UnitQuery from "./UnitQuery";
import Fuse from "fuse.js";

/**
 * Fuzzy Search algorithm
 */
export default class fuzzy {
  static main(searchItem){
      var options = {
        include: ["score"],
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys:["UnitCode", "UnitName"]
      };
      var data = UnitQuery.getUnitCodeAndUnitNames();
      var fuse = Fuse(data, options);

      return fuse.search(searchItem);
  }
}
