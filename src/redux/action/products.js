
import { store } from '../store';
import types from '../types';

const { dispatch } = store;


export const getProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: types.GET_PRODUCTS,
      payload: { products },
    });
  };
};