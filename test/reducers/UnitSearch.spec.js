import UnitSearch from "../../app/reducers/UnitSearch";
import { describe, it } from "mocha";

describe("REDUCER: UnitSearch", () => {
    describe("ACTION: FETCH_UNITS_PENDING", () => {
        it("should begin fetching important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: [],
                unitSearchIsLoading: false,
                unitSearchError: true
            };
            const action = {
                type: "FETCH_UNITS_PENDING"
            };
            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: [],
                unitSearchIsLoading: true,
                unitSearchError: false
            };
            test(UnitSearch, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_UNITS_REJECTED", () => {
        it("should handled failed fetch of important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: [],
                unitSearchIsLoading: true,
                unitSearchError: false
            };

            const action = {
                type: "FETCH_UNITS_REJECTED"
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: [],
                unitSearchIsLoading: false,
                unitSearchError: true
            };

            test(UnitSearch, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_UNITS_FULFILLED", () => {
        it("should handled failed fetch of important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: [],
                unitSearchIsLoading: true,
                unitSearchError: false
            };

            const action = {
                type: "FETCH_UNITS_FULFILLED",
                payload: ["unit1", "unit2", "unit3"]
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicUnits: ["unit1", "unit2", "unit3"],
                unitSearchIsLoading: false,
                unitSearchError: false
            };

            test(UnitSearch, stateBefore, action, stateAfter);
        });
    });
});