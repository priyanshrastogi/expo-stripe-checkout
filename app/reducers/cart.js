import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions';

export default function(state = {}, action) {
  const { payload } = action;
  switch(action.type) {
    
    case ADD_TO_CART:
      if(state[payload._id] === undefined) {
        state[payload._id] = payload;
        state[payload._id].quantity = 1;
      } 
      else {
        state[payload._id].quantity = state[payload._id].quantity + 1;
      }
      //console.log(state);
      return {...state};

    case REMOVE_FROM_CART:
      if(state[payload._id].quantity < 2) {
        delete state[payload._id];
      }
      else {
        state[payload._id].quantity = state[payload._id].quantity - 1;
      }
      //console.log(state);
      return {...state};

    default:
      return state;
    }
}