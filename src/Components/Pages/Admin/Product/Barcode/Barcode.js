import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../../Shared/AdminSidebar/Sidebar';
import { useParams } from 'react-router-dom'; // For route params
import axios from 'axios'; // For API calls
import './Barcode.css';

const Barcode = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get product ID from URL

  useEffect(() => {
    // Fetch the product data based on the ID
    axios
      .get(`http://localhost:5000/products/${id}`) // Backend endpoint to fetch a single product
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>; // Show a loading message until data is fetched
  }

  return (
    <div className="admin-Barcode-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Barcode-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="barcode-card">
          {/* Card Header */}
          <div className="barcode-card-header mb-2">
            <h4>Generate Barcode Stickers:</h4>
          </div>

          {/* Card Body */}
          <div className="barcode-card-body">
            <div className="container">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Print Barcode</h5>
                  <div className="mt-3">
                    <label>Product:</label>
                    <input
                      className="form-control"
                      value={product.productname} // Populate from product data
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Barcode:</label>
                    <input
                      className="form-control"
                      value={product.barcode}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Price:</label>
                    <input
                      className="form-control"
                      value={product.price}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Stock QTY:</label>
                    <input
                      className="form-control"
                      value={product.stock}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Barcode Quantity:</label>
                    <input className="form-control" placeholder="Barcode Quantity" />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Product Image</h5>
                  <img
                    src={`http://localhost:5000${product.image}`} // Adjust based on backend
                    alt="Product"
                    className="img-fluid"
                    style={{ width: '400px', height: '400px', objectFit: 'contain' }} // Add custom width, height, and objectFit
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3 mt-3">
                  <button className="btn btn-primary">Generate Barcode</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barcode;
