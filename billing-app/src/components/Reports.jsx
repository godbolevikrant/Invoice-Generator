import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format, subWeeks, subMonths, subYears, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import html2pdf from 'html2pdf.js';

const Reports = () => {
  const bills = useSelector((state) => state.billHistory.bills);
  const [period, setPeriod] = useState('weekly');

  // Calculate date range based on selected period
  const getDateRange = () => {
    const now = new Date();
    switch (period) {
      case 'weekly':
        return { start: startOfWeek(subWeeks(now, 1)), end: now };
      case 'monthly':
        return { start: startOfMonth(subMonths(now, 1)), end: now };
      case 'yearly':
        return { start: startOfYear(subYears(now, 1)), end: now };
      default:
        return { start: now, end: now };
    }
  };

  // Filter bills within the date range
  const { start, end } = getDateRange();
  const filteredBills = bills.filter((bill) => {
    const billDate = new Date(bill.timestamp);
    return billDate >= start && billDate <= end;
  });

  // Calculate report data
  const totalSales = filteredBills.reduce((sum, bill) => sum + bill.total, 0);
  const totalBills = filteredBills.length;
  const dishQuantities = filteredBills.reduce((acc, bill) => {
    bill.items.forEach((item) => {
      acc[item.dish.name] = (acc[item.dish.name] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const handlePrintReport = () => {
    const element = document.getElementById('report-content');
    html2pdf()
      .from(element)
      .set({ filename: `${period}-report.pdf`, margin: 10 })
      .save();
  };

  return (
    <div className="mt-5">
      <h3>Sales Reports</h3>
      <div className="mb-3">
        <label htmlFor="period" className="form-label">Select Period:</label>
        <select
          id="period"
          className="form-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div id="report-content">
        <h4>{period.charAt(0).toUpperCase() + period.slice(1)} Report</h4>
        <p>
          Period: {format(start, 'PPP')} - {format(end, 'PPP')}
        </p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Sales (₹)</td>
              <td>{totalSales.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Bills</td>
              <td>{totalBills}</td>
            </tr>
          </tbody>
        </table>
        <h5>Dishes Sold</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dishQuantities).map(([dish, quantity]) => (
              <tr key={dish}>
                <td>{dish}</td>
                <td>{quantity}</td>
              </tr>
            ))}
            {Object.keys(dishQuantities).length === 0 && (
              <tr>
                <td colSpan="2" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalBills > 0 && (
        <button className="btn btn-primary mt-3" onClick={handlePrintReport}>
          Print/Download Report
        </button>
      )}
    </div>
  );
};

export default Reports;