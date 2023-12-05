export const cartReducer = (state, action)=>{
    switch(action.type){
        case 'DECREASE_QTY':{
            let quantity = state.qty - 1;
            let TotalProductPrice = quantity * state.price;
            let updatedItems = {
                qty: quantity,
                TotalProductPrice
            }
            let newState = {...state, ...updatedItems}

           return newState
        };

        case 'INCREASE_QTY':{
            let quantity = state.qty + 1;
            let TotalProductPrice = quantity * state.price;
            let updatedItems = {
                qty: quantity,
                TotalProductPrice
            }
            let newState = {...state, ...updatedItems}

           return newState
        }; 

        default:
            return state
    }

}