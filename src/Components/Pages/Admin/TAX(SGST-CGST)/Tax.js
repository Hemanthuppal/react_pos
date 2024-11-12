import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./Tax.css"

const Tax = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-Tax-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Tax-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default Tax
