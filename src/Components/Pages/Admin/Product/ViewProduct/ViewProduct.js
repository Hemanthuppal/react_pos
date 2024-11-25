import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminSidebar from '../../../../Shared/AdminSidebar/Sidebar';
import './ViewProduct.css';
import axios from 'axios';

const ViewProduct = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get product ID from URL params

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="admin-viewproduct-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-viewproduct-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="barcode-card">
          <div className="top-line"></div>
          <div className="barcode-card-header">
            <h4>View Product</h4>
          </div>
          <div className="header-underline"></div>
          <div className="barcode-card-body">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Product Details</h5>
                  <div className="details-box">
                    <div className="detail-row">
                      <label>Barcode: {product.barcode}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Product Name: {product.productname}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Category: {product.category}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Description: {product.description}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Stock: {product.stock}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Purchase Price: {product.purchase}</label>
                    </div>
                    <div className="row-line"></div>
                    <div className="detail-row">
                      <label>Sale Price: {product.price}</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Product Image</h5>
                  <div className="image-box">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.productname}
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
