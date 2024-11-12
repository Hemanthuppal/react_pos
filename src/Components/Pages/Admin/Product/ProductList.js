import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./ProductList.css"


const ProductList = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-ProductList-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-ProductList-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default ProductList
