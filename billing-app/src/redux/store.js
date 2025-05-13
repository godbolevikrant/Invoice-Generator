import { configureStore } from '@reduxjs/toolkit';
import dishReducer from './slices/dishSlice';
import billReducer from './slices/billSlice';
import billHistoryReducer from './slices/billHistorySlice';

const store = configureStore({
  reducer: {
    dishes: dishReducer,
    bill: billReducer,
    billHistory: billHistoryReducer,
  },
});

export default store;