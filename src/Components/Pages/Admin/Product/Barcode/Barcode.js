import React, { useState } from 'react';
import AdminSidebar from '../../../../Shared/AdminSidebar/Sidebar';
import burger from "./../../../../Images/burger3.jpg";
import './Barcode.css';

const Barcode = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-Barcode-container'>
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
                                    <div className='mt-3'>
                                    <label>Product:</label>
                                    <input className="form-control" placeholder='Product name' />
                                    </div>
                                    <div className='mt-3'>
                                    <label>Barcode:</label>
                                    <input className="form-control" placeholder='Barcode' />
                                    </div>
                                    <div className='mt-3'>
                                    <label>Price:</label>
                                    <input className="form-control" placeholder='Price' />
                                    </div>
                                    <div className='mt-3'>
                                    <label>Stock QTY:</label>
                                    <input className="form-control" placeholder='Stock Qty' />
                                    </div>
                                    <div className='mt-3'>
                                    <label>Barcode Quantity:</label>
                                    <input className="form-control" placeholder='Barcode Quantity' />
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <h5 className="barcode-header">Product Image</h5>
                                    <img src={burger} alt="Product"  className='img-fluid'/>
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
  )
}

export default Barcode