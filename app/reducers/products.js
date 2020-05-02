import { GET_PRODUCTS } from '../actions';

export default function(state = [], action) {
  const { payload } = action;
  switch(action.type) {
    case GET_PRODUCTS:
      return payload;
    default:
      return state;
    }
}