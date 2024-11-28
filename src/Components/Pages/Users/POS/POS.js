import React, { useState,useEffect } from 'react';
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
import { FaList } from "react-icons/fa";
import DataTable from '../../../DataTable/DataTable';
import { FaPrint, FaEdit, FaTrash } from 'react-icons/fa';
import { FaMoneyBillWave, FaRegCreditCard } from 'react-icons/fa';
import axios from 'axios';
import './POS.css';

const POS = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [taxDiscount, setTaxDiscount] = useState({ sgst: 0, cgst: 0, discount: 0 });
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState('CASH');
  const [paidAmount, setPaidAmount] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);


   // Load products from localStorage on initial render
   useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
      setProducts(savedProducts);
    } else {
      fetchProducts();
    }
  }, []);

  // Fetch products from the backend (if needed)
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-searchproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products from database:', error);
    }
  };

  // Fetch tax and discount rates
  useEffect(() => {
    const fetchTaxDiscount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/taxdiscount');
        const latestTax = response.data[response.data.length - 1]; // Get the latest tax and discount record
        setTaxDiscount(latestTax);
      } catch (err) {
        console.error('Error fetching tax and discount:', err);
      }
    };
    fetchTaxDiscount();
  }, []);

  // Calculate Subtotal and Total whenever products or taxDiscount change
  useEffect(() => {
    const newSubtotal = products.reduce((acc, product) => acc + product.total, 0);
    setSubtotal(newSubtotal);

    const discountAmount = (newSubtotal * taxDiscount.discount) / 100;
    const sgstAmount = (newSubtotal * taxDiscount.sgst) / 100;
    const cgstAmount = (newSubtotal * taxDiscount.cgst) / 100;

    setTotal(newSubtotal - discountAmount + sgstAmount + cgstAmount);
  }, [products, taxDiscount]);

  // Save products to localStorage whenever products are updated
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  // Fetch filtered products based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      axios
        .get(`http://localhost:5000/products?search=${searchQuery}`)
        .then(response => setFilteredProducts(response.data))
        .catch(err => console.error('Error fetching products:', err));
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBarcodeChange = async (e) => {
    const inputBarcode = e.target.value;
    setBarcode(inputBarcode);

    if (inputBarcode.trim()) {
      try {
        const response = await axios.get(`http://localhost:5000/product-by-barcode/${inputBarcode}`);
        const product = response.data;

        const existingProduct = products.find(p => p.barcode === product.barcode);
        let updatedProducts;
        if (existingProduct) {
          updatedProducts = products.map(p =>
            p.barcode === product.barcode
              ? { ...p, qty: p.qty + 1, total: (p.qty + 1) * p.price }
              : p
          );
        } else {
          updatedProducts = [...products, { ...product, qty: 1, total: product.price }];
        }
        setProducts(updatedProducts);
        setBarcode('');
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = products.find(p => p.id === product.id);
    let updatedProducts;

    if (existingProduct) {
      updatedProducts = products.map(p =>
        p.id === product.id
          ? { ...p, qty: p.qty + 1, total: (p.qty + 1) * p.price }
          : p
      );
    } else {
      updatedProducts = [...products, { ...product, qty: 1, total: product.price }];
    }
    setProducts(updatedProducts);
    setSearchQuery('');
    setFilteredProducts([]);
  };

  const handleIncrement = (index) => {
    const updatedProducts = products.map((p, i) =>
      i === index ? { ...p, qty: p.qty + 1, total: (p.qty + 1) * p.price } : p
    );
    setProducts(updatedProducts);
  };

  const handleDecrement = (index) => {
    const updatedProducts = products.map((p, i) =>
      i === index && p.qty > 1
        ? { ...p, qty: p.qty - 1, total: (p.qty - 1) * p.price }
        : p
    );
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Returns YYYY-MM-DD
  };
  
  const handleSaveOrder = async () => {
    const orderDetails = {
      subtotal,              // Frontend-calculated subtotal
      discount: (subtotal * taxDiscount.discount) / 100, // Frontend-calculated discount
      sgst: (subtotal * taxDiscount.sgst) / 100,         // Frontend-calculated SGST
      cgst: (subtotal * taxDiscount.cgst) / 100,         // Frontend-calculated CGST
      total,                 // Frontend-calculated total
      paid: paidAmount,      // Paid amount
      due: total - paidAmount, // Due amount
      paymentType,           // Selected payment type
      products,              // Product list
      orderDate: new Date().toISOString(), // Current date-time
      taxDiscount,           // Pass tax rates for reference
    };
  
    const productDetails = products.map((product) => ({
      barcode: product.barcode,
      product_id: product.id,
      product_name: product.productname,
      qty: product.qty,
      rate: product.price,
      saleprice: product.total,
      orderdate: new Date().toISOString(),
    }));
  
    try {
      // Save order details
      await axios.post('http://localhost:5000/save-order', orderDetails);
  
      // Save product details
      // await axios.post('http://localhost:5000/save-productdetails', productDetails);
  
      alert('Order saved successfully!');
      setProducts([]);
      setPaidAmount(0);
      setDueAmount(0);
      localStorage.removeItem('products');
    } catch (err) {
      console.error('Error saving order or product details:', err);
      alert('Failed to save order. Please try again.');
    }
  };

  return (
    <div className="admin-UserPOS-container d-flex">
      <UserSidebar onToggleSidebar={setCollapsed} />
      <div className={` admin-UserPOS-content flex-grow-1 p-3 ml-3 ${collapsed ? 'collapsed' : ''}`}>
        <div className="container-fluid d-flex flex-column" style={{ height: '100%' }}>
          <div className="card p-3 mt-0">
            <h4 className="text-center mb-4">POS</h4>

            {/* Barcode Scanner and Search */}
            <div className="row mb-3">
              <div className="col-8">
                <div className="input-group mb-2" >
                  <div className="input-group-prepend">
                    <span className="input-group-text" style={{ fontSize: '1.5rem', padding: '0.5rem' }}>
                      <FaList />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Scan Barcode"
                    value={barcode}
                    onChange={handleBarcodeChange}
                  />
                </div>
                <div className="dropdown">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Select OR Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    aria-describedby="product-search-dropdown"
                  />
                   {filteredProducts.length > 0 && (
                    <div className="dropdown-menu show" aria-labelledby="product-search-dropdown">
                      {filteredProducts.map(product => (
                        <button
                          key={product.id}
                          className="dropdown-item"
                          onClick={() => handleProductSelect(product)}
                        >
                          {product.productname}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    maxHeight: '400px', // restrict height to make scrollbars appear
                    overflow: 'scroll',  // both X and Y scrollbars will appear
                    whiteSpace: 'nowrap',
                    height: "500px" // prevent table from wrapping
                  }}
                >
                  <table className="table table-bordered text-center" style={{ minWidth: '800px' }}>
                    <thead className="thead-light">
                      <tr>
                          <th style={{ width: '15%' }}>Product</th>
                          <th style={{ width: '15%' }}>Stock</th>
                          <th style={{ width: '15%' }}>Price</th>
                          <th style={{ width: '10%' }}>QTY</th>
                          <th style={{ width: '15%' }}>Total</th>
                          <th style={{ width: '10%' }}>Del</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Product rows dynamically added here */}

                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.productname}</td>
                          <td>{product.stock}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleDecrement(index)}
                            >
                              -
                            </button>
                            <span className="mx-2">{product.qty}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleIncrement(index)}
                            >
                              +
                            </button>
                          </td>
                          <td>{product.total}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(index)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-4 d-flex flex-column">
                {/* Summary Section */}
                <div className="p-3 bg-light">
                  <div className="form-group row align-items-center">
                    <label className="col-6">Subtotal (Rs)</label>
                    <div className="col-6">
                      <input type="text" className="form-control" value={subtotal} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">Discount (%)</label>
                    <div className="col-6">
                      <input type="text" className="form-control" value={taxDiscount.discount} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">SGST (%)</label>
                    <div className="col-6">
                      <input type="text" className="form-control" value={taxDiscount.sgst} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">CGST (%)</label>
                    <div className="col-6">
                      <input type="text" className="form-control" value={taxDiscount.cgst} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">Total (Rs)</label>
                    <div className="col-6">
                      <input type="text" className="form-control" value={total} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                  <label className="col-6">Paid (Rs)</label>
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">Due (Rs)</label>
                    <div className="col-6">
                      <input type="number" className="form-control" value={total - paidAmount} disabled />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-6">Payment Type</label>
                    <div className="col-6 d-flex">
                      {/* Cash Radio Button */}
                      <div className="form-check mr-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="paymentCash"
                          value="CASH"
                          checked={paymentType === 'CASH'}
                          onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="paymentCash">
                          <FaMoneyBillWave className="text-success" /> {/* Updated Cash Icon */}
                          Cash
                        </label>
                      </div>

                      {/* Cheque Radio Button */}
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="paymentCheck"
                          value="CHECK"
                          checked={paymentType === 'CHECK'}
                          onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="paymentCheck">
                          <FaRegCreditCard className="text-primary" /> {/* Updated Cheque Icon */}
                          Cheque
                        </label>
                      </div>
                     </div>
                  </div>
                  <button className="btn btn-primary mt-2" onClick={handleSaveOrder}>
                    Save Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
