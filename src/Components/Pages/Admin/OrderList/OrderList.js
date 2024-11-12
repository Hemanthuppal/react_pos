import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./OrderList.css"

const OrderList = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-Order-container'>
        <AdminSidebar onToggleSidebar={setCollapsed} />
        <div className={`admin-Order-content ${collapsed ? 'collapsed' : ''}`}>
      
    </div>
    </div>
  )
}

export default OrderList
