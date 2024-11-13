import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./AddProduct.css";

const AddProduct = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-AddProduct-container'>
  <AdminSidebar onToggleSidebar={setCollapsed} />
  <div className={`admin-AddProduct-content ${collapsed ? 'collapsed' : ''}`}>
  <div className="card ">
    <div className="container mt-4">
        <h2 className="text-center mb-4">Add Product</h2>
        <div className="container">
          <h4>Product</h4>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="barcode" className="form-label">Barcode</label>
                <input type="text" className="form-control" id="barcode" placeholder="Enter Barcode" />
              </div>
              <div className="col-md-6">
                <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                <input type="number" className="form-control" id="stockQuantity" placeholder="Enter Stock Quantity" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" />
              </div>
              <div className="col-md-6">
                <label htmlFor="productPrice" className="form-label">Product Price</label>
                <input type="number" className="form-control" id="productPrice" placeholder="Enter Product Price" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" placeholder="Enter Category" />
              </div>
              <div className="col-md-6">
                <label htmlFor="salesPrice" className="form-label">Sales Price</label>
                <input type="number" className="form-control" id="salesPrice" placeholder="Enter Sales Price" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" placeholder="Enter Description" rows="3"></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="productImage" className="form-label">Product Image</label>
                <input type="file" className="form-control" id="productImage" />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">Save Product</button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
      </div>
  );
};

export default AddProduct;
