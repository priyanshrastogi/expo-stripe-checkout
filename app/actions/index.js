import axios from 'axios';

export const GET_PRODUCTS = 'get_products';
export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';

export const getProducts = () => dispatch => {
  const pizzas = [
    {
      _id: '1',
      name: 'Veggie Delight',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=40',
      amount: '600'
    },
    {
      _id: '2',
      name: 'Classic Papperoni',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=40',
      amount: '900'
    },
  ]
  dispatch({type: GET_PRODUCTS, payload: pizzas});
}

export const addToCart = (product) => dispatch => {
  dispatch({type: ADD_TO_CART, payload: product});
}

export const removeFromCart = (product) => dispatch => {
  dispatch({type: REMOVE_FROM_CART, payload: product});
}