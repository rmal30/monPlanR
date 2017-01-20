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
            return Object.assign(
                {}, 
                state, 
                {creditPoints: state.creditPoints + value}
            );
        
        /*
            Decrements the credit points by the given value, note that if the value would send the counter into negative, it 
            instead just returns 0.
        */
        case "DECREMENT_CREDIT_POINTS":
            if(state.creditPoints - value < 0){
                return Object.assign(
                    {}, 
                    state, 
                    {creditPoints: 0}
                );
            } else {
                return Object.assign(
                    {}, 
                    state, 
                    {creditPoints: state.creditPoints - value}
                );
            }
        
        /*
            Increments the cost by the given value
        */
        case "INCREMENT_COST":
            return Object.assign(
                {}, 
                state, 
                {cost: state.cost + value}
            );
        
        /*
            Decrements the cost by the given value, note that if the value would send the counter into negative, it
            instead just returns 0
        */
        case "DECREMENT_COST":
            if(state.cost - value < 0){
                return Object.assign(
                    {},
                    state,
                    {cost: 0}
                );
            } else {
                return Object.assign(
                    {}, 
                    state, 
                    {cost: state.cost - value}
                );
            }
        
        /*
            Resets the counters when the course is cleared as there will be no costs or credit points associated 
            with an empty course
        */  
        case "CLEAR_COURSE":
            return {
                cost: 0,
                creditPoints: 0
            };
            
        default:
            return state;
    }
};

export default Counter;