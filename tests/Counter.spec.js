import CourseStructure from "../app/components/Course/CourseStructure.jsx";
import FullTestSuite from "../app/tests/FullTestSuite";
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import Counter from "../app/reducers/Counter";


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
        })
    })

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
        })
    })

    /**
     * 
     */
    describe("ACTION: DECREMENT_CREDIT_POINTS", () => {
        it("Should decrement the credit point state to 0 if a value give is larger than the current credit point value", () => {
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
        })
    })

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
        })
    })

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
        })
    })

    /**
     * 
     */
    describe("ACTION: DECREMENT_COST", () => {
        it("Should decrement the cost state to 0 if a value give is larger than the current credit point value", () => {
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
        })
    })
})
