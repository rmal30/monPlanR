import UnitCacheReducer from "../../app/reducers/UnitCacheReducer";
import { describe, it } from "mocha";

describe("REDUCER: UnitCache", () => {
    describe("ACTION: INITIALISE_NEW_CACHE", () => {
        it("Should correctly create a new cache instance if there is no local storage value saved, or it is too old", () => {
            const stateBefore = {
                timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {
                    "TEST1001": {
                        timeOfLastAccess: "Tue Mar 07 2017 12:07:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TEST1001",
                            eftsl: 0,
                            descriptions: ""
                        }
                    },
                    "TES1002": {
                        timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TES1002",
                            eftsl: 0,
                            descriptions: ""
                        }
                    },
                },
                cacheSize: 2,
                MAX_CACHE_SIZE: 20
            };

            const action = {
                type: "INITIALISE_NEW_CACHE",
                timeOfAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)"
            };

            const stateAfter = {
                timeOfLastAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {},
                cacheSize: 0,
                MAX_CACHE_SIZE: 20
            };

            test(UnitCacheReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: REMOVE_ITEM_FROM_CACHE", () => {
        it("should correctly remove an item with the given key from the cache ", () => {
            const stateBefore = {
                timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {
                    "TEST1001": {
                        timeOfLastAccess: "Tue Mar 07 2017 12:07:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TEST1001",
                            eftsl: 0,
                            descriptions: ""
                        }
                    },
                    "TES1002": {
                        timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TES1002",
                            eftsl: 0,
                            descriptions: ""
                        }
                    },
                },
                cacheSize: 2,
                MAX_CACHE_SIZE: 20
            };

            const action = {
                type: "REMOVE_ITEM_FROM_CACHE",
                keyValueToDelete: "TEST1001",
                timeOfAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)"
            };

            const stateAfter = {
                timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {
                    "TES1002": {
                        timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TES1002",
                            eftsl: 0,
                            descriptions: ""
                        }
                    },
                },
                cacheSize: 1,
                MAX_CACHE_SIZE: 20
            };

            test(UnitCacheReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: ADD_ITEM_TO_CACHE", () => {
        it("should correctly add an item to the cache ", () => {
            const stateBefore = {
                timeOfLastAccess: "Tue Mar 07 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {},
                cacheSize: 0,
                MAX_CACHE_SIZE: 20
            };
 
            const action = {
                type: "ADD_ITEM_TO_CACHE",
                timeOfAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)",
                unitCode: "TEST1001",
                unitInfo: {
                    preqs: "None",
                    creditPoints: 6,
                    rules: [],
                    locationAndTime: [],
                    enjoyScore: 0,
                    learnScore: 0,
                    learnResponse: 0,
                    proh: "",
                    scaBand: 0,
                    unitName: "",
                    enjoyResponse: 0,
                    faculty: "",
                    unitCode: "TES1002",
                    eftsl: 0,
                    descriptions: ""
                } 
            };
 
            const stateAfter = {
                timeOfLastAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)",
                unitCache: {
                    "TEST1001": {
                        timeOfLastAccess: "Wed Mar 08 2017 12:09:12 GMT+1100 (AEDT)",
                        unitInfo: {
                            preqs: "None",
                            creditPoints: 6,
                            rules: [],
                            locationAndTime: [],
                            enjoyScore: 0,
                            learnScore: 0,
                            learnResponse: 0,
                            proh: "",
                            scaBand: 0,
                            unitName: "",
                            enjoyResponse: 0,
                            faculty: "",
                            unitCode: "TES1002",
                            eftsl: 0,
                            descriptions: ""
                        }
                    }
                },
                cacheSize: 1,
                MAX_CACHE_SIZE: 20
            };
            
            test(UnitCacheReducer, stateBefore, action, stateAfter);
        });
    });
});