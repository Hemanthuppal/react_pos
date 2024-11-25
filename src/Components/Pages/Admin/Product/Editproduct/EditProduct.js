import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../../Shared/AdminSidebar/Sidebar';
import './EditProduct.css';
import axios from 'axios';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [productData, setProductData] = useState({
        barcode: '',
        productname: '',
        category: '',
        description: '',
        stock: '',
        purchase: '',
        price: '',
        image: null,
        existingImage: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then(response => {
                const product = response.data;
                setProductData({
                    barcode: product.barcode,
                    productname: product.productname,
                    category: product.category,
                    description: product.description,
                    stock: product.stock,
                    purchase: product.purchase,
                    price: product.price,
                    existingImage: product.image || '',
                    image: null,
                });
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProductData(prevState => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleRemoveImage = () => {
        setProductData(prevState => ({
            ...prevState,
            image: null,
            existingImage: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('barcode', productData.barcode);
        formData.append('productname', productData.productname);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('stock', productData.stock);
        formData.append('purchase', productData.purchase);
        formData.append('price', productData.price);

        if (productData.image) {
            formData.append('image', productData.image);
        }

        axios.put(`http://localhost:5000/products/${id}`, formData)
            .then(() => {
                alert('Product updated successfully!');
                navigate('/productlist');
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="admin-editproduct-container">
            <AdminSidebar onToggleSidebar={setCollapsed} />
            <div className={`admin-editproduct-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="card card-green-border">
                    <div className="container">
                        <h8 className="edit-product-header">Edit Product</h8>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3 mt-3">
                                <div className="col-md-6">
                                    <label htmlFor="barcode" className="form-label">Barcode</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="barcode"
                                        name="barcode"
                                        value={productData.barcode}
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
                                        value={productData.stock}
                                        onChange={handleChange}
                                        placeholder="Enter Stock Quantity"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="productname" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productname"
                                        name="productname"
                                        value={productData.productname}
                                        onChange={handleChange}
                                        placeholder="Enter Product Name"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="purchase" className="form-label">Purchase Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="purchase"
                                        name="purchase"
                                        value={productData.purchase}
                                        onChange={handleChange}
                                        placeholder="Enter Purchase Price"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        value={productData.category}
                                        onChange={handleChange}
                                        placeholder="Enter Category"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="price" className="form-label">Sale Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={productData.price}
                                        onChange={handleChange}
                                        placeholder="Enter Sale Price"
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
                                        value={productData.description}
                                        onChange={handleChange}
                                        placeholder="Enter Description"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="image" className="form-label">Product Image</label>
                                    {productData.existingImage && (
                                        <div className="position-relative">
                                            <img
                                                src={`http://localhost:5000${productData.existingImage}`}
                                                alt="Product"
                                                className="img-thumbnail"
                                                style={{ width: '150px', height: '150px' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link btn-remove-image"
                                                onClick={handleRemoveImage}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    )}
                                    {!productData.existingImage && !productData.image && (
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="Placeholder"
                                            className="img-thumbnail"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-green">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
