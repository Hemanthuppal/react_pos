import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./Category.css";

const Category = () => {
    const [collapsed, setCollapsed] = useState(false);


  return (
    <div className='admin-Category-container'>
        <AdminSidebar onToggleSidebar={setCollapsed} />
        <div className={`admin-Category-content ${collapsed ? 'collapsed' : ''}`}>
      
    </div>
    </div>
  )
}

export default Category
