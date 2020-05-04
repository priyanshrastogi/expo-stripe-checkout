import axios from 'axios';

export const GET_PRODUCTS = 'get_products';
export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';
export const CLEAR_CART = 'clear_cart';

export const getProducts = () => dispatch => {
  const pizzas = [
    {
      _id: '1',
      name: 'Classic Margherita',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
      amount: '799'
    },
    {
      _id: '2',
      name: 'Classic Pepperoni',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=40',
      amount: '1499'
    },
    {
      _id: '3',
      name: 'Capricciosa',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=40',
      amount: '1199'
    },
    {
      _id: '4',
      name: 'Quattro Stagioni',
      image: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40',
      amount: '1299'
    }
  ]
  dispatch({type: GET_PRODUCTS, payload: pizzas});
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