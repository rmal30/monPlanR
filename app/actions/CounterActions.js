/**
 * INCREMENT_CREDIT_POINTS
 */
export const incrementCreditPoints = (amount) => {
    return {
        type: "INCREMENT_CREDIT_POINTS",
        value: amount
    };
};

/**
 * DECREMENT_CREDIT_POINTS
 */
export const decrementCreditPoints = (amount) => {
    return {
        type: "DECREMENT_CREDIT_POINTS",
        value: amount
    };
};

/**
 * INCREMENT_COST
 */
export const incrementCost = (amount) => {
    return {
        type: "INCREMENT_COST",
        value: amount
    };
};

/**
 * DECREMENT_COST
 */
export const decrementCost = (amount) => {
    return {
        type: "DECREMENT_COST",
        value: amount
    };
};


