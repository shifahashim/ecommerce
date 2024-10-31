import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductGrid from './ProductGrid';
import './App.css'; // We'll style everything in this file

const App = () => {
  const [currentPage, setCurrentPage] = useState('grid'); // To handle navigation

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setCurrentPage('grid')}>Products</li>
          <li onClick={() => setCurrentPage('form')}>Add Product</li>
        </ul>
      </div>
      <div className="main-content">
        {currentPage === 'grid' ? <ProductGrid /> : <ProductForm />}
      </div>
    </div>
  );
};

export default App;
