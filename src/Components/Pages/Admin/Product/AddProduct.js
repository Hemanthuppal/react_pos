import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./AddProduct.css"


const AddProduct = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-AddProduct-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-AddProduct-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default AddProduct
