import axios from 'axios';
import URLs from '../constants/URLs';

export const GET_PRODUCTS = 'get_products';
export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';
export const CLEAR_CART = 'clear_cart';

export const getProducts = () => async dispatch => {
  const result = await axios.get(`${URLs.BASE_API}/.netlify/functions/api/products`);
  dispatch({type: GET_PRODUCTS, payload: result.data});
}

export const addToCart = (product) => dispatch => {
  dispatch({type: ADD_TO_CART, payload: product});
}

export const removeFromCart = (product) => dispatch => {
  dispatch({type: REMOVE_FROM_CART, payload: product});
}

export const clearCart = () => dispatch => {
  dispatch({type: CLEAR_CART, payload: {}});
}