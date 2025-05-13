import { createSlice } from '@reduxjs/toolkit';

const loadDishesFromStorage = () => {
  const dishes = localStorage.getItem('dishes');
  return dishes ? JSON.parse(dishes) : [];
};

const saveDishesToStorage = (dishes) => {
  localStorage.setItem('dishes', JSON.stringify(dishes));
};

const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    dishes: loadDishesFromStorage(),
  },
  reducers: {
    addDish: (state, action) => {
      state.dishes.push(action.payload);
      saveDishesToStorage(state.dishes);
    },
    editDish: (state, action) => {
      const { id, name, price } = action.payload;
      const index = state.dishes.findIndex((dish) => dish.id === id);
      if (index !== -1) {
        state.dishes[index] = { id, name, price };
        saveDishesToStorage(state.dishes);
      }
    },
    deleteDish: (state, action) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
      saveDishesToStorage(state.dishes);
    },
  },
});

export const { addDish, editDish, deleteDish } = dishSlice.actions;
export default dishSlice.reducer;