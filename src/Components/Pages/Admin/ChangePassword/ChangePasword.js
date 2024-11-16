import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./ChangePassword.css";

const ChangePassword = () => {
  const [collapsed, setCollapsed] = useState(false);
  <h3>Change Password</h3>

  return (
    <div>
    
      <div className="admin-ChangePassword-container">
        <AdminSidebar onToggleSidebar={setCollapsed} />
        <div className={`admin-ChangePassword-content ${collapsed ? 'collapsed' : ''}`}>
          <div className="card p-3">
            <h3 className="password-heading">Change Password</h3>
            <div className="row mt-3">
              <div className="col-md-12 ">
                <label>Old Password:</label>
                <input type="password" className="form-control" placeholder="Old Password" />
              </div>
              </div>
              <div className='row mt-3'>
              <div className="col-md-12 " >
                <label>New Password:</label>
                <input type="password" className="form-control" placeholder="New Password" />
              </div>
              </div>
              <div className='row mt-3'>
              <div className="col-md-12 ">
                <label>Repeat New Password:</label>
                <input type="password" className="form-control" placeholder="Repeat New Password" />
              </div>
              </div>
             
           
            <div className="col-md-4 mt-3 mb-3" > 
              <button className="update-password-button btn-warning btn">Update Password</button>
              </div>
          </div>
          </div>
          
        </div>
      </div>
 
  );
};

export default ChangePassword;
