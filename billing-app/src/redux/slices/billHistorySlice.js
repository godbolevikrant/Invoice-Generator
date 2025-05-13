import { createSlice } from '@reduxjs/toolkit';

const loadBillsFromStorage = () => {
  const bills = localStorage.getItem('billHistory');
  return bills ? JSON.parse(bills) : [];
};

const saveBillsToStorage = (bills) => {
  localStorage.setItem('billHistory', JSON.stringify(bills));
};

const billHistorySlice = createSlice({
  name: 'billHistory',
  initialState: {
    bills: loadBillsFromStorage(),
  },
  reducers: {
    addBillToHistory: (state, action) => {
      state.bills.push(action.payload);
      saveBillsToStorage(state.bills);
    },
    clearBillHistory: (state) => {
      state.bills = [];
      saveBillsToStorage(state.bills);
    },
  },
});

export const { addBillToHistory, clearBillHistory } = billHistorySlice.actions;
export default billHistorySlice.reducer;