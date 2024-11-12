import React, { useState } from 'react';

import "./POS.css"
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
const POS = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-UserPOS-container'>
      <UserSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-UserPOS-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default POS
