export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export function addToCart(name, qty, price) {
  return {
    type: ADD_TO_CART,
    payload: { name, qty, price }
  }
}

export function deleteFromCart(name) {
  return {
    type: DELETE_FROM_CART,
    payload: { name }
  }
}