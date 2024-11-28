
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import './AddProduct.css';

const AddProduct = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    barcode: '',
    productName: '',
    category: '',  // We will store the category id here
    description: '',
    stock: '',
    purchase: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // State for storing categories

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories'); // Adjust URL if needed
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
  
    // Replace category ID with category name
    const categoryName = categories.find(cat => cat.id === parseInt(formData.category))?.name || '';

    console.log('Category Name:', categoryName);
  
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key !== 'category') {
        data.append(key, formData[key]);
      }
    });
  
    // Append category name instead of ID
    data.append('category', categoryName);
  
    // Append image file if exists
    if (image) {
      data.append('image', image);
    }
  
    try {
      const response = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        alert('Product added successfully!');
        setFormData({
          barcode: '',
          productName: '',
          category: '', // Reset category to empty
          description: '',
          stock: '',
          purchase: '',
          price: '',
        });
        setImage(null);
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };
  

  return (
    <div className='admin-AddProduct-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-AddProduct-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="card">
          <div className="container mt-4">
            <h2 className="text-center mb-4">Add Product</h2>
            <div className="container">
              <h4>Product</h4>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="barcode" className="form-label">Barcode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="barcode"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleChange}
                      placeholder="Enter Barcode"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="stock" className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Enter Stock Quantity"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Product Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter Product Price"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="purchase" className="form-label">Sales Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="purchase"
                      name="purchase"
                      value={formData.purchase}
                      onChange={handleChange}
                      placeholder="Enter Sales Price"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter Description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
