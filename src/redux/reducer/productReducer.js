import types from "../types";

const initialState = {
  products: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
}