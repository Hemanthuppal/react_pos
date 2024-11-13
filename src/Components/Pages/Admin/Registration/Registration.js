import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./Registration.css";
import { FaTrash } from 'react-icons/fa';

const Registration = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='admin-Registration-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Registration-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="container mt-3">
          <div className="d-flex justify-content-between">
            {/* Overall Card */}
            <div className="card p-3 flex-fill">
              <h3 className="inner-header mb-4 pb-1 border-bottom">Registration</h3>
              <div className="row">
                {/* Form - col-md-4 */}
                <div className="col-md-4">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">Role</label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        required
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                  </form>
                </div>

                {/* Table - col-md-8 */}
                <div className="col-md-8">
                  <h4 className="border-bottom">Registered Users</h4>
                  <table className="table table-striped mt-3">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Srithajana</td>
                        <td>Srithajana@gmail.com</td>
                        <td>12345</td>
                        <td>User</td>
                        <td>
                          <button className="btn btn-danger">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Admin</td>
                        <td>admin@gmail.com</td>
                        <td>12345</td>
                        <td>Admin</td>
                        <td>
                          <button className="btn btn-danger">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
