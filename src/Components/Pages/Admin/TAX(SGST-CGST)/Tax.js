import React, { useState } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import './Tax.css';
import burger from "./../../../Images/burger3.jpg"

const Tax = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='admin-Tax-container'>
            <AdminSidebar onToggleSidebar={setCollapsed} />
            <div className={`admin-Tax-content ${collapsed ? 'collapsed' : ''}`}>
               
            </div>
        </div>
    );
};

export default Tax;
