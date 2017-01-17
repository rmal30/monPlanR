import expect from 'expect';
import deepFreeze from 'deep-freeze';
import Counter from "../reducers/Counter";

// Counter action tests


const testIncrementCreditPoints = () => {
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
 }


const testDecrementCreditPointsA = () => {
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
 }
  
const testDecrementCreditPointsB = () => {
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
 }

const testIncrementCost = () => {
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
 }

 const testDecrementCostA = () => {
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
 }
  
const testDecrementCostB = () => {
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
 }


const CounterTestSuite = (setting="standard") => {
    
    let verbose = (setting === "verbose");
    let silent = (setting === "silent");

    testIncrementCreditPoints();
    if(verbose) {
        console.log("Counter: Incrementing CP passed");
    }
    
    testDecrementCreditPointsA();
    if(verbose) {
        console.log("Counter: Decrementing CP above 0 passed");
    }
    
    testDecrementCreditPointsB();
    if(verbose) {
        console.log("Counter: Decrementing CP below 0 passed");
    }

    testIncrementCost();
    if(verbose) {
        console.log("Counter: Incrementing Cost passed");
    }
    
    testDecrementCostA();
    if(verbose) {
        console.log("Counter: Decrementing Cost above 0 passed");
    }
    
    testDecrementCostB();
    if(verbose) {
        console.log("Counter: Decrementing Cost below 0 passed");
    }


    
    if(!silent) {
        console.log("All Counter tests passed")
    }
}

export default CounterTestSuite