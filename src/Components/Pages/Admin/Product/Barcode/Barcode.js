import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../../Shared/AdminSidebar/Sidebar';
import { useParams } from 'react-router-dom'; // For route params
import axios from 'axios'; // For API calls
import './Barcode.css';

const Barcode = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [product, setProduct] = useState(null);
  const [barcodeQuantity, setBarcodeQuantity] = useState(1);
  const [barcodeImage, setBarcodeImage] = useState('');
  const [scannedProduct, setScannedProduct] = useState(null); // Store details of the scanned product
  const [scannedBarcode, setScannedBarcode] = useState(''); // Track the scanned barcode

  const { id } = useParams(); // Get product ID from URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const generateBarcode = () => {
    if (!id) {
      console.error("Product ID is missing");
      return;
    }
  
    console.log("Generating barcode for product ID:", id);
  
    axios
      .get(`http://localhost:5000/generate-barcode/${id}`, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setBarcodeImage(url);  // Set the barcode image URL for display
      })
      .catch((err) => {
        if (err.response) {
          // Check for the response from the server (error message)
          console.error('Error response:', err.response.data);
          console.error('Error status:', err.response.status);
          console.error('Error headers:', err.response.headers);
        } else if (err.request) {
          // Check for the request itself (no response)
          console.error('No response received:', err.request);
        } else {
          // Something went wrong setting up the request
          console.error('Error message:', err.message);
        }
      });
  };

  const handleScan = () => {
    if (!scannedBarcode) return;
    axios
      .get(`http://localhost:5000/product-by-barcode/${scannedBarcode}`)
      .then((response) => {
        setScannedProduct(response.data); // Store scanned product details
      })
      .catch((err) => console.error('Error fetching scanned product:', err));
  };

  return (
    <div className="admin-Barcode-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Barcode-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="barcode-card">
          <div className="barcode-card-header mb-2">
            <h4>Generate Barcode Stickers:</h4>
          </div>
          <div className="barcode-card-body">
            <div className="container">
              {/* Original Product Information */}
              <div className="row">
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Print Barcode</h5>
                  <div className="mt-3">
                    <label>Product:</label>
                    <input
                      className="form-control"
                      value={product?.productname || ''}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Barcode:</label>
                    <input
                      className="form-control"
                      value={product?.barcode || ''}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Price:</label>
                    <input
                      className="form-control"
                      value={product?.price || ''}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Stock QTY:</label>
                    <input
                      className="form-control"
                      value={product?.stock || ''}
                      readOnly
                    />
                  </div>
                  <div className="mt-3">
                    <label>Barcode Quantity:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Barcode Quantity"
                      value={barcodeQuantity}
                      onChange={(e) => setBarcodeQuantity(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <h5 className="barcode-header">Product Image</h5>
                  <img
                    src={`http://localhost:5000${product?.image}`}
                    alt="Product"
                    className="img-fluid"
                    style={{ width: '400px', height: '400px', objectFit: 'contain' }}
                  />
                </div>
              </div>

                            <div className="row align-items-center mt-3">
                <div className="col-md-6 d-flex align-items-center justify-content-between">
                  <button className="btn btn-primary" onClick={generateBarcode}>
                    Generate Barcode
                  </button>
                  {barcodeImage && (
                    <div className="barcode-image-container">
                      <h5>Generated Barcode Sticker</h5>
                      <img
                        src={barcodeImage}
                        alt="Generated Barcode"
                        className="barcode-img"
                        style={{ width: '200px', height: 'auto', objectFit: 'contain', marginLeft: '20px' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Barcode Scanner Section */}
              <div className="mt-4">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="barcode-scan-input">
                    <label>Scan Barcode:</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={scannedBarcode}
                        onChange={(e) => setScannedBarcode(e.target.value)}
                        placeholder="Scan barcode or enter manually"
                      />
                      <button className="btn btn-success" onClick={handleScan}>
                        Fetch Product
                      </button>
                    </div>
                  </div>

                  {scannedProduct && (
                    <div className="scanned-product-details ms-4">
                      <h5>Scanned Product Details:</h5>
                      <p><strong>Name:</strong> {scannedProduct.productname}</p>
                      <p><strong>Barcode:</strong> {scannedProduct.barcode}</p>
                      <p><strong>Price:</strong> {scannedProduct.price}</p>
                      <p><strong>Stock:</strong> {scannedProduct.stock}</p>
                      <img
                        src={`http://localhost:5000${scannedProduct.image}`}
                        alt="Scanned Product"
                        className="img-fluid"
                        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
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
