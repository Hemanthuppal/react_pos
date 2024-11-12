import React, { useState } from 'react';
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
import "./Orderlist.css"

const Orderlist = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-UserOrderList-container'>
      <UserSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-UserOrderList-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default Orderlist
