import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import DataTable from './../../../DataTable/DataTable';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the category being edited

  // Fetch categories from the database
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  console.log(categories)

  // Add or update a category
  const handleSave = async () => {
    if (category.trim()) {
      try {
        if (editingId) {
          // Update category if editing
          await axios.put(`http://localhost:5000/categories/${editingId}`, { name: category });
          alert('Category updated successfully');
          setEditingId(null); // Reset editing state
        } else {
          // Add new category
          await axios.post('http://localhost:5000/categories', { name: category });
          alert('Added Category successfully');
        }
        fetchCategories(); // Refresh the list
        setCategory(''); // Clear input field
      } catch (error) {
        console.error('Error saving category:', error);
      }
    }
  };

  // Prepare to edit a category
  const handleEdit = (id, currentName) => {
    setEditingId(id); // Set the ID of the category being edited
    setCategory(currentName); // Populate the input field with the current name
  };

  // Delete a category with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/categories/${id}`);
        fetchCategories(); // Refresh the list
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
    },
    {
      Header: 'Category',
      accessor: 'name',
    },
    {
      Header: 'Edit',
      Cell: ({ row }) => (
        <button
          onClick={() => handleEdit(row.original.id, row.original.name)}
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
    <div className="admin-Category-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Category-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="container">
          <div className="card p-4">
            <div className="row">
              {/* Category Form */}
              <div className="col-md-4">
                <h3>{editingId ? 'Edit Category' : 'Category Form'}</h3>
                <label>Category</label>
                <input
                  className="form-control"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                      setCategory(''); // Clear input field
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="col-md-8">
                <h3>Category List</h3>
                <DataTable columns={columns} data={categories} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
