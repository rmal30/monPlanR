/**
 * The Counter reducer is in charge of controlling the state of the cost and credit point
 * counters.
 */
const Counter = (state = {cost: 0, creditPoints: 0}, action) => {

    const { value } = action; //pull out the value from the payload

    switch(action.type) {

        /*
            Increments the number of credit points by the given value
        */
        case "INCREMENT_CREDIT_POINTS":
            return {
                ...state,
                creditPoints: state.creditPoints + value
            };

        /*
            Decrements the credit points by the given value, note that if the value would send the counter into negative, it
            instead just returns 0.
        */
        case "DECREMENT_CREDIT_POINTS":
            return {
                ...state,
                creditPoints: Math.max(0, state.creditPoints - value)
            };

        /*
            Increments the cost by the given value
        */
        case "INCREMENT_COST":
            return {
                ...state,
                cost: state.cost + value
            };

        /*
            Decrements the cost by the given value, note that if the value would send the counter into negative, it
            instead just returns 0
        */
        case "DECREMENT_COST":
            return {
                ...state,
                cost: Math.max(0, state.cost - value)
            };

        /*
            Resets the counters when the course is cleared as there will be no costs or credit points associated
            with an empty course
        */
        case "CLEAR_COURSE":
            return {
                cost: 0,
                creditPoints: 0
            };

        case "REMOVE_TEACHING_PERIOD":
            return {
                cost: action.units.reduce((prev, next) => {
                    if (next === null) {
                        return prev;
                    } else {
                        return Math.max(0, prev - next.cost);
                    }
                }, state.cost),
                creditPoints: action.units.reduce((prev, next) => {
                    if (next === null) {
                        return prev;
                    } else {
                        return Math.max(0, prev - next.creditPoints);
                    }
                }, state.creditPoints),
            };


        case "REMOVE_UNIT":
            return {
                ...state,
                cost: Math.max(0, state.cost - action.cost),
                creditPoints: Math.max(0, state.creditPoints - action.creditPoints)
            };

        case "ADD_UNIT":
            return {
                ...state,
                cost: state.cost + action.cost,
                creditPoints: state.creditPoints + action.creditPoints
            };


        case "DECREASE_STUDY_LOAD":
            return {
                cost: action.units.reduce((prev, next) => {
                    if (next === null || !next.Cost) {
                        return prev;
                    } else {
                        return Math.max(0, prev - next.Cost);
                    }
                }, state.cost),
                creditPoints: action.units.reduce((prev, next) => {
                    if (next === null || !next.CreditPoints) {
                        return prev;
                    } else {
                        return Math.max(0, prev - next.CreditPoints);
                    }
                }, state.creditPoints)
            };

        default:
            return state;


    }
};

export default Counter;
