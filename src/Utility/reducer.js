import { type } from "./action.type";
export const initialState = {
  cart: [],
  authLoading: true,
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_CART:
      const exists = state.cart.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.item, quantity: 1 }],
      };

    case type.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.item.id),
      };

    case type.REMOVE_ONE:
      const item = state.cart.find((i) => i.id === action.item.id);
      if (!item) return state;
      if (item.quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.item.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.item.id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      };
    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case type.SET_AUTH_LOADING:
      return {
        ...state,
        authLoading: action.authLoading,
      };
    case type.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
