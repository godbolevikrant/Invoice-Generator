import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    items: [],
    taxRate: 0.05, // 5% tax (configurable)
  },
  reducers: {
    addItemToBill: (state, action) => {
      const { dish, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.dish.id === dish.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ dish, quantity });
      }
    },
    updateItemQuantity: (state, action) => {
      const { dishId, quantity } = action.payload;
      const item = state.items.find((item) => item.dish.id === dishId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItemFromBill: (state, action) => {
      state.items = state.items.filter((item) => item.dish.id !== action.payload);
    },
    completeBill: (state) => {
      state.items = []; // Clear current bill after completion
    },
    setTaxRate: (state, action) => {
      state.taxRate = action.payload;
    },
  },
});

export const { addItemToBill, updateItemQuantity, removeItemFromBill, completeBill, setTaxRate } = billSlice.actions;
export default billSlice.reducer;