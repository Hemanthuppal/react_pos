import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./POS.css"


const POS = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-POS-container'>
    <AdminSidebar onToggleSidebar={setCollapsed} />
    <div className={`admin-POS-content ${collapsed ? 'collapsed' : ''}`}>
  
</div>
</div>
  )
}

export default POS
