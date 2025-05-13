import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemQuantity, removeItemFromBill, completeBill } from '../redux/slices/billSlice';
import { addBillToHistory } from '../redux/slices/billHistorySlice';
import html2pdf from 'html2pdf.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const BillSummary = () => {
  const { items, taxRate } = useSelector((state) => state.bill);
  const dispatch = useDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleCompleteBill = () => {
    
    if (items.length === 0) return;
    const bill = {
      id: uuidv4(),
      items,
      subtotal,
      tax,
      total,
      timestamp: new Date().toISOString(),
    };
    dispatch(addBillToHistory(bill));
    dispatch(completeBill());
  };

  const handlePrint = () => {
    const element = document.getElementById('bill-summary');
    html2pdf()
      .from(element)
      .set({ filename: 'bill.pdf', margin: 10 })
      .save();
  };

  return (
    <div>
      <div id="bill-summary">
        <div className="text-center mb-4">
    <h2>Hotel Paradise</h2>
    <p>123 Main Street, Mumbai, Maharashtra</p>
    <p>Mobile: +91 80878 99201</p>
  </div>
  <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Total (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.dish.id}>
                <td>{item.dish.name}</td>
                <td>{item.dish.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateItemQuantity({ dishId: item.dish.id, quantity: parseInt(e.target.value) }))
                    }
                    min="1"
                    style={{ width: '80px' }}
                  />
                </td>
                <td>{(item.dish.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(removeItemFromBill(item.dish.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax ({(taxRate * 100).toFixed(0)}%): ₹{tax.toFixed(2)}</p>
          <h5>Total: ₹{total.toFixed(2)}</h5>
        </div>
        <hr />
        <div className="mt-4">
    <p><strong>Note:</strong> Thank you for dining with us! Please visit again.</p>
  </div>
      </div>
      {items.length > 0 && (
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={handlePrint}>
            Print/Download PDF
          </button>
          <button className="btn btn-success me-2" onClick={handleCompleteBill}>
            Complete Bill
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => dispatch(completeBill())}
          >
            Clear Bill
          </button>

          <button className="btn btn-outline-success" onClick={() => window.open('https://api.whatsapp.com/send?text=Your%20bill%20details%20here', '_blank')}>
            Open WhatsApp
          </button>
        </div>
        
      )}
       
    </div>
  );
};

export default BillSummary;