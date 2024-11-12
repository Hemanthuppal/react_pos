import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./Dashboard.css"

const Dashboard = () => {

    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-Dashboard-container'>
        <AdminSidebar onToggleSidebar={setCollapsed} />
        <div className={`admin-Dashboard-content ${collapsed ? 'collapsed' : ''}`}>
      
    </div>
    </div>
  )
}

export default Dashboard
