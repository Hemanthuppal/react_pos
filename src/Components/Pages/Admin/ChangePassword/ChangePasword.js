import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import "./ChangePassword.css"

const ChangePasword = () => {
    const [collapsed, setCollapsed] = useState(false);


    return (
      <div className='admin-ChangePassword-container'>
          <AdminSidebar onToggleSidebar={setCollapsed} />
          <div className={`admin-ChangePassword-content ${collapsed ? 'collapsed' : ''}`}>
        
      </div>
      </div>
  )
}

export default ChangePasword
