import ImportantDates from "../../app/reducers/ImportantDates";
import { describe, it } from "mocha";

describe("REDUCER: ImportantDates", () => {
    describe("ACTION: FETCH_IMPORTANT_DATES_PENDING", () => {
        it("should begin fetching important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [],
                importantDatesLoading: false,
                importantDatesError: false
            };
            const action = {
                type: "FETCH_IMPORTANT_DATES_PENDING"
            };
            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [],
                importantDatesLoading: true,
                importantDatesError: false
            };
            test(ImportantDates, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_IMPORTANT_DATES_REJECTED", () => {
        it("should handled failed fetch of important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [],
                importantDatesLoading: false,
                importantDatesError: false
            };

            const action = {
                type: "FETCH_IMPORTANT_DATES_REJECTED"
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [],
                importantDatesLoading: false,
                importantDatesError: true
            };

            test(ImportantDates, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_IMPORTANT_DATES_FULFILLED", () => {
        it("should handled failed fetch of important dates correctly ", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [],
                importantDatesLoading: false,
                importantDatesError: false
            };

            const action = {
                type: "FETCH_IMPORTANT_DATES_FULFILLED",
                payload: [
                    {
                        "value": "HE IS A SAURABH"
                    }
                ]
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                importantDates: [{"value": "HE IS A SAURABH"}],
                importantDatesLoading: false,
                importantDatesError: false
            };

            test(ImportantDates, stateBefore, action, stateAfter);
        });
    });
});