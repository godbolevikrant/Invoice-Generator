import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDish } from '../redux/slices/dishSlice';

const DishList = ({ setDishToEdit }) => {
  const dishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setDishToEdit(dish)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(deleteDish(dish.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishList;