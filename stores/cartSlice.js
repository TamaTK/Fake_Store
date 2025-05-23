import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.items.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.items = state.items.filter((cartItem) => cartItem.id !== itemId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;