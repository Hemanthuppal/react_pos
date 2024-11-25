import React, { useState } from 'react';
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
import { FaList } from "react-icons/fa";
import DataTable from '../../../DataTable/DataTable';
import { FaPrint, FaEdit, FaTrash } from 'react-icons/fa';
import './POS.css';

const POS = () => {
  const [collapsed, setCollapsed] = useState(false);

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
                  <input type="text" className="form-control" placeholder="Scan Barcode" />
                </div>
                <input type="text" className="form-control mb-3" placeholder="Select OR Search"  />
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
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-4 d-flex flex-column" style={{ paddingTop: '0' }}>
                <div className="p-3 bg-light" style={{ flexGrow: 1 }}>
                  {/* Summary Section */}
                  {[
                    { label: "SUBTOTAL (Rs)", placeholder: "", suffix: "Rs" },
                    { label: "DISCOUNT (%)", placeholder: "", suffix: "%" },
                    { label: "DISCOUNT (Rs)", placeholder: "", suffix: "Rs" },
                    { label: "SGST (%)", placeholder: "2.5", suffix: "%" },
                    { label: "CGST (%)", placeholder: "2.5", suffix: "%" },
                    { label: "SGST (Rs)", placeholder: "", suffix: "Rs" },
                    { label: "CGST (Rs)", placeholder: "", suffix: "Rs" },
                    { label: "TOTAL (Rs)", placeholder: "", suffix: "Rs" },
                  ].map((item, index) => (
                    <div className="form-group row align-items-center" key={index}>
                       <label className="col-auto col-form-label text-right m-0">{item.label}</label>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={item.placeholder}
                            disabled={index % 2 === 0 && index !== 0} // Disable specific fields
                          />
                        </div>
                        <div className="col-auto col-form-label m-0">{item.suffix}</div>
                    </div>
                  ))}

                  <hr />

                  {/* Payment Method */}
                  <div className="form-group">
                    <label>Payment:</label>
                    <div className="d-flex">
                      {["CASH", "CARD", "CHECK"].map((method, index) => (
                        <div className="form-check form-check-inline" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payment"
                            id={`payment-${method}`}
                            defaultChecked={index === 0}
                          />
                          <label className="form-check-label" htmlFor={`payment-${method}`}>
                            {method}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr />

                  {/* Due and Paid Fields */}
                  {[
                    { label: "DUE (Rs)", placeholder: "", suffix: "Rs" },
                    { label: "PAID (Rs)", placeholder: "", suffix: "Rs" },
                  ].map((item, index) => (
                    <div className="form-group row align-items-center" key={index}>
                     <label className="col-auto col-form-label text-right m-0">{item.label}</label>
                      <div className="col p-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={item.placeholder}
                          disabled={index === 0}
                        />
                      </div>
                      <div className="col-auto col-form-label m-0">{item.suffix}</div>
                    </div>
                  ))}

                  {/* Save Order Button */}
                  <div className="d-grid mt-3">
                    <button className="btn btn-success">Save Order</button>
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

export default POS;
