import expect from "expect";
import deepFreeze from "deep-freeze";
import Counter from "../../app/reducers/Counter";
import { describe, it } from "mocha";

/**
 *
 */
describe("REDUCER: Counter", () => {

    /**
     *
     */
    describe("ACTION: INCREMENT_CREDIT_POINTS", () => {
        it("Should increment the credit point state by a given value", () => {
            const stateBefore = {cost: 2, creditPoints: 0};
            const action = {
                type: "INCREMENT_CREDIT_POINTS",
                value: 1,
            };
            const stateAfter = {
                cost: 2,
                creditPoints: 1
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    /**
     *
     */
    describe("ACTION: DECREMENT_CREDIT_POINTS", () => {
        it("Should decrement the credit point state by a given value", () => {
            const stateBefore = {cost: 40, creditPoints: 50};
            const action = {
                type: "DECREMENT_CREDIT_POINTS",
                value: 10,
            };
            const stateAfter = {
                cost: 40,
                creditPoints: 40
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should decrement the credit point state to 0 if a value given is larger than the current credit point value", () => {
            const stateBefore = {cost: 40, creditPoints: 50};
            const action = {
                type: "DECREMENT_CREDIT_POINTS",
                value: 51,
            };
            const stateAfter = {
                cost: 40,
                creditPoints: 0
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    /**
     *
     */
    describe("ACTION: INCREMENT_COST", () => {
        it("Should increment the cost state by a given value", () => {
            const stateBefore = {cost: 20, creditPoints: 13};
            const action = {
                type: "INCREMENT_COST",
                value: 1,
            };
            const stateAfter = {
                cost: 21,
                creditPoints: 13
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    /**
     *
     */
    describe("ACTION: DECREMENT_COST", () => {
        it("Should decrement the cost state by a given value", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "DECREMENT_COST",
                value: 10,
            };
            const stateAfter = {
                cost: 40,
                creditPoints: 40
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should decrement the cost state to 0 if a value given is larger than the current credit point value", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "DECREMENT_COST",
                value: 51,
            };
            const stateAfter = {
                cost: 0,
                creditPoints: 40
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: CLEAR_COURSE", () => {
        it("Should reset the cost and credit point counters to 0", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "CLEAR_COURSE"
            };
            const stateAfter = {cost: 0, creditPoints: 0};

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: REMOVE_TEACHING_PERIOD", () => {
        it("Should correctly go through and decrement the counters for each value ", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                tp: [null, {cost: 2, creditPoints: 20}, {cost: 5, creditPoints: 10}, null]
            };
            const stateAfter = {cost: 43, creditPoints: 10};

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);

        });

        it("Should not decrement the counters below 0 ", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                tp: [null, {cost: 25, creditPoints: 20}, {cost: 30, creditPoints: 30}, {cost: 0, creditPoints: 10}]
            };
            const stateAfter = {cost: 0, creditPoints: 0};

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Counter(stateBefore, action)
            ).toEqual(stateAfter);

        });
    });
});
