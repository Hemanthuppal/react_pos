import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import DataTable from './../../../DataTable/DataTable'; // Adjust the import path as needed
import './Category.css';

const Category = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([
        'Electronics',
        'Fashion',
        'Home & Kitchen',
        'Books',
        'Toys',
    ]); // Dummy data

    // Handler to save category
    const handleSave = () => {
        if (category.trim()) {
            setCategories([...categories, category]);
            setCategory(''); // Reset input after saving
        }
    };

    // Handler to delete category
    const handleDelete = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    // Handler to edit category
    const handleEdit = (index) => {
        const newCategory = prompt("Edit Category", categories[index]);
        if (newCategory !== null && newCategory.trim()) {
            const updatedCategories = categories.map((cat, i) =>
                i === index ? newCategory : cat
            );
            setCategories(updatedCategories);
        }
    };

    // Define columns for DataTable
    const columns = [
        {
            Header: '#',
            accessor: (_, index) => index + 1, // Serial number
        },
        {
            Header: 'Category',
            accessor: 'name',
        },
        {
            Header: 'Edit',
            Cell: ({ row }) => (
                <button
                    onClick={() => handleEdit(row.index)}
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
                    onClick={() => handleDelete(row.index)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            ),
        },
    ];

    // Prepare data for DataTable
    const data = categories.map((cat) => ({ name: cat }));

    return (
        <div className='admin-Category-container'>
            <AdminSidebar onToggleSidebar={setCollapsed} />
            <div className={`admin-Category-content ${collapsed ? 'collapsed' : ''}`}>
                <div className='container'>
                    <div className="card p-4">
                        <div className="row">
                            {/* Category Form (left side) */}
                            <div className='col-md-4'>
                                <h3>Category Form</h3>
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
                                    Save
                                </button>
                            </div>

                            {/* Category Table (right side) */}
                            <div className='col-md-8'>
                                <h3>Category List</h3>
                                <DataTable columns={columns} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
