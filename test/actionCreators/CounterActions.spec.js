import expect from "expect";
import { describe, it } from "mocha";
import * as actions from "../../app/actionCreators/CounterActions";

describe("ACTION-CREATOR: CounterActions", () => {
    describe("AC: incrementCreditPoints", () => {
        it("Should create an action to increment credit points counter", () => {
            const expectedAction = {
                type: "INCREMENT_CREDIT_POINTS",
                value: 5
            };

            expect(actions.incrementCreditPoints(5)).toEqual(expectedAction);
        });
    });

    describe("AC: decrementCreditPoints", () => {
        it("Should create an action to decrement credit points counter", () => {
            const expectedAction = {
                type: "DECREMENT_CREDIT_POINTS",
                value: 5
            };

            expect(actions.decrementCreditPoints(5)).toEqual(expectedAction);
        });
    });

    describe("AC: incrementCost", () => {
        it("Should create an action to increment cost counter", () => {
            const expectedAction = {
                type: "INCREMENT_COST",
                value: 5
            };

            expect(actions.incrementCost(5)).toEqual(expectedAction);
        });
    });

    describe("AC: decrementCosts", () => {
        it("Should create an action to decrement cost counter", () => {
            const expectedAction = {
                type: "DECREMENT_COST",
                value: 5
            };

            expect(actions.decrementCost(5)).toEqual(expectedAction);
        });
    });
});
