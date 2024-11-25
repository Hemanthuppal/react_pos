import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import DataTable from './../../../DataTable/DataTable';
import axios from 'axios';
import './Tax.css';

const Tax = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [taxData, setTaxData] = useState([]); // Holds tax data (SGST, CGST, Discount)
  const [formData, setFormData] = useState({
    id: '',        // Include ID for editing
    sgst: '',
    cgst: '',
    discount: '',
  });
  const [editingId, setEditingId] = useState(null); // Track if we are editing an existing tax record

  // Fetch tax data from the server
  useEffect(() => {
    fetchTaxData();
  }, []);

  const fetchTaxData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/taxdiscount');
      setTaxData(response.data); // Set tax data
    } catch (error) {
      console.error('Error fetching tax data:', error);
    }
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle saving a new or edited tax data
  const handleSave = async () => {
    const { sgst, cgst, discount, id } = formData;
    if (sgst && cgst && discount) {
      try {
        if (id) {
          // Update the tax data if editing
          await axios.put(`http://localhost:5000/taxdiscount/${id}`, { sgst, cgst, discount });
          alert('Tax updated successfully');
          setEditingId(null); // Reset the editing state
        } else {
          // Add new tax data if not editing
          await axios.post('http://localhost:5000/taxdiscount', { sgst, cgst, discount });
          alert('Tax added successfully');
        }
        fetchTaxData(); // Refresh the list of tax data
        setFormData({ sgst: '', cgst: '', discount: '' }); // Clear form fields
      } catch (error) {
        console.error('Error saving tax data:', error);
      }
    }
  };

  // Prepare form for editing a tax record
  const handleEdit = (tax) => {
    setFormData(tax); // Populate form with the tax data to edit
    setEditingId(tax.id); // Mark that we are editing
  };

  // Handle deleting a tax record
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tax data?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/taxdiscount/${id}`);
        fetchTaxData(); // Refresh the list of tax data
      } catch (error) {
        console.error('Error deleting tax data:', error);
      }
    }
  };

  // Define columns for the DataTable
  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1, // Add serial number
    },
    {
      Header: 'SGST',
      accessor: 'sgst', // Display SGST
    },
    {
      Header: 'CGST',
      accessor: 'cgst', // Display CGST
    },
    {
      Header: 'Discount',
      accessor: 'discount', // Display Discount
    },
    {
      Header: 'Edit',
      Cell: ({ row }) => (
        <button
          onClick={() => handleEdit(row.original)}
          className="btn btn-warning"
        >
          Edit
        </button>
      ),
    },
    {
      Header: 'Delete',
      Cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="admin-Tax-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Tax-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="container">
          <div className="card p-4">
            <div className="row">
              {/* Tax Form */}
              <div className="col-md-4">
                <h3>{editingId ? 'Edit Tax' : 'Tax Form'}</h3>
                <label>SGST (%)</label>
                <input
                  className="form-control"
                  name="sgst"
                  value={formData.sgst}
                  onChange={handleFormChange}
                />
                <label>CGST (%)</label>
                <input
                  className="form-control"
                  name="cgst"
                  value={formData.cgst}
                  onChange={handleFormChange}
                />
                <label>Discount (%)</label>
                <input
                  className="form-control"
                  name="discount"
                  value={formData.discount}
                  onChange={handleFormChange}
                />
                <button
                  className="btn btn-warning mt-3"
                  onClick={handleSave}
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={() => {
                      setEditingId(null); // Cancel editing
                      setFormData({ sgst: '', cgst: '', discount: '' }); // Clear input fields
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Tax List Table */}
              <div className="col-md-8">
                <h3>Tax List</h3>
                <DataTable columns={columns} data={taxData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tax;
