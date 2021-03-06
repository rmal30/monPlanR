import Counter from "../../app/reducers/Counter";
import { describe, it } from "mocha";

describe("REDUCER: Counter", () => {
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

            test(Counter, stateBefore, action, stateAfter);
        });
    });

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

            test(Counter, stateBefore, action, stateAfter);
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

            test(Counter, stateBefore, action, stateAfter);
        });
    });

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

            test(Counter, stateBefore, action, stateAfter);
        });
    });

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

            test(Counter, stateBefore, action, stateAfter);
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

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: CLEAR_COURSE", () => {
        it("Should reset the cost and credit point counters to 0", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "CLEAR_COURSE"
            };
            const stateAfter = {cost: 0, creditPoints: 0};

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: REMOVE_TEACHING_PERIOD", () => {
        it("Should correctly go through and decrement the counters for each value ", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                units: [null, {cost: 2, creditPoints: 20}, {cost: 5, creditPoints: 10}, null]
            };
            const stateAfter = {cost: 43, creditPoints: 10};

            test(Counter, stateBefore, action, stateAfter);
        });

        it("Should not decrement the counters below 0 ", () => {
            const stateBefore = {cost: 50, creditPoints: 40};
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                units: [null, {cost: 25, creditPoints: 20}, {cost: 30, creditPoints: 30}, {cost: 0, creditPoints: 10}]
            };
            const stateAfter = {cost: 0, creditPoints: 0};

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: REMOVE_UNIT", () => {
        it("Should correctly decrement the counters based on the given units creditpoints and cost", () => {
            const stateBefore = {cost: 50, creditPoints: 40};

            const action = {
                type: "REMOVE_UNIT",
                cost: 20,
                creditPoints: 20
            };

            const stateAfter = {cost: 30, creditPoints: 20};

            test(Counter, stateBefore, action, stateAfter);
        });

        it("Should not decrement the counters below 0", () => {
            const stateBefore = {cost: 10, creditPoints: 10};

            const action = {
                type: "REMOVE_UNIT",
                cost: 20,
                creditPoints: 20
            };

            const stateAfter = {cost: 0, creditPoints: 0};

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: ADD_UNIT", () => {
        it("Should correctly increment the counters when a unit is added to the plan", () => {
            const stateBefore = {cost: 10, creditPoints: 10};

            const action = {
                type: "ADD_UNIT",
                cost: 20,
                creditPoints: 20
            };

            const stateAfter = {cost: 30, creditPoints: 30};

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: DECREASE_STUDY_LOAD", () => {
        it("Should not decrease counters if there are no units in the overload column", () => {
            const stateBefore = {cost: 16400, creditPoints: 48};

            const action = {
                type: "DECREASE_STUDY_LOAD",
                units: []
            };

            test(Counter, stateBefore, action, stateBefore);
        });

        it("Should not decrease counters if there are no units which have values in the overload column", () => {
            const stateBefore = {cost: 16400, creditPoints: 48};

            const action = {
                type: "DECREASE_STUDY_LOAD",
                units: [null, {}]
            };

            test(Counter, stateBefore, action, stateBefore);
        });

        it("Should decrease counters correctly for units in the overload column", () => {
            const stateBefore = {cost: 40000, creditPoints: 144};

            const action = {
                type: "DECREASE_STUDY_LOAD",
                units: [
                    {
                        CreditPoints: 6,
                        Cost: 1134
                    },
                    {
                        CreditPoints: 12,
                        Cost: 2256
                    }
                ]
            };

            const stateAfter = {cost: 36610, creditPoints: 126};

            test(Counter, stateBefore, action, stateAfter);
        });
    });

    describe("DEFAULT", () => {
        it("Should not change state if it does not recognise an action", () => {
            const stateBefore = {cost: 40000, creditPoints: 144};

            const action = {
                type: "THIS_IS_A_LONG_NAME_FOR_AN_ACTION",
                value: 42
            };

            test(Counter, stateBefore, action, stateBefore);
        });
    });
});
