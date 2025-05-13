import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDish, editDish } from '../redux/slices/dishSlice';
import { v4 as uuidv4 } from 'uuid';

const DishForm = ({ dishToEdit, setDishToEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(dishToEdit ? dishToEdit.name : '');
  const [price, setPrice] = useState(dishToEdit ? dishToEdit.price : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (dishToEdit) {
      dispatch(editDish({ id: dishToEdit.id, name, price: parseFloat(price) }));
      setDishToEdit(null);
    } else {
      dispatch(addDish({ id: uuidv4(), name, price: parseFloat(price) }));
    }
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Dish Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {dishToEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DishForm;