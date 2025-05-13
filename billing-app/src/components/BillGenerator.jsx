import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToBill } from '../redux/slices/billSlice';

const BillGenerator = () => {
  const dishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();
  const [selectedDishId, setSelectedDishId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedDishId || quantity < 1) return;
    const dish = dishes.find((d) => d.id === selectedDishId);
    if (dish) {
      dispatch(addItemToBill({ dish, quantity }));
      setSelectedDishId('');
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleAddItem} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedDishId}
            onChange={(e) => setSelectedDishId(e.target.value)}
          >
            <option value="">Select Dish</option>
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name} (₹{dish.price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-success w-100">
            Add to Bill
          </button>
        </div>
      </div>
    </form>
  );
};

export default BillGenerator;