import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./Registration.css"

const Registration = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-Registration-container'>
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Registration-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default Registration
