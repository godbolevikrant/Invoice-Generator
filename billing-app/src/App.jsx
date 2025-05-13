import React, { useState } from 'react';
import DishForm from './components/DishForm';
import DishList from './components/DishList';
import BillGenerator from './components/BillGenerator';
import BillSummary from './components/BillSummary';
import Reports from './components/Reports';

const App = () => {
  const [dishToEdit, setDishToEdit] = useState(null);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Billing App</h1>
      <div className="row">
        <div className="col-lg-6">
          <h3>Manage Dishes</h3>
          <DishForm dishToEdit={dishToEdit} setDishToEdit={setDishToEdit} />
          <DishList setDishToEdit={setDishToEdit} />
        </div>
        <div className="col-lg-6">
          <h3>Generate Bill</h3>
          <BillGenerator />
          <BillSummary />
        </div>
      </div>
      <hr />
      <Reports />
    </div>
  );
};

export default App;