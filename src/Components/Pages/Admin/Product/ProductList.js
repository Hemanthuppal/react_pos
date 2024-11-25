import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import DataTable from '../../../DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import { FaList, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'; // Import Axios for API calls

const ProductList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]); // State for products
  const navigate = useNavigate();


  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product with ID:', id);
      axios
        .delete(`http://localhost:5000/products/${id}`) // Call the backend API
        .then(() => {
          // Filter out the deleted product from the state
          setProducts(products.filter((product) => product.id !== id));
          alert('Product deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete the product. Please try again.');
        });
    }
  };
  


  useEffect(() => {
    // Fetch product data from backend
    axios.get('http://localhost:5000/products') // Adjust URL to match your API endpoint
      .then((response) => {
        setProducts(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const columns = [
    { Header: 'Barcode', accessor: 'barcode' },
    { Header: 'Product Name', accessor: 'productname' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Stock', accessor: 'stock' },
    { Header: 'Purchase Price', accessor: 'purchase' },
    { Header: 'Sale Price', accessor: 'price' },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ cell: { value } }) => (
        <img
          src={value.startsWith('/uploads') ? `http://localhost:5000${value}` : value}
          alt="Product"
          style={{ width: '50px' }}
        />
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div>
          <FaList className="text-info me-2" style={{ cursor: 'pointer' }} 
          onClick={() => navigate(`/barcode/${row.original.id}`)} // Pass product ID
        />

          <FaEye
            className="text-primary me-2"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/viewproduct/${row.original.id}`)} // Pass product ID
          />
          <FaEdit
            className="text-success me-2"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/editproduct/${row.original.id}`)} // Pass product ID
          />
          <FaTrash
            className="text-danger me-2"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteProduct(row.original.id)} // Pass the product ID
          />
        </div>
      ),
    },
  ];

  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  return (
    <div className="admin-ProductList-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-ProductList-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h2 className="m-0">Product List</h2>
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
        <hr />
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductList;
