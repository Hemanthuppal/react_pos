import React, { useState } from 'react';
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
import "./ChangePassword.css"

const ChangePassword = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className='admin-UserChangePassword-container'>
      <UserSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-UserChangePassword-content ${collapsed ? 'collapsed' : ''}`}>
    
  </div>
  </div>
  )
}

export default ChangePassword
