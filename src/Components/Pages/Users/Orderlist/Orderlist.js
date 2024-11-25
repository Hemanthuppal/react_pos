import React, { useState } from 'react';
import UserSidebar from '../../../Shared/UserSidebar/Sidebar';
import DataTable from '../../../DataTable/DataTable';
import { FaPrint, FaEdit, FaTrash } from 'react-icons/fa';
import "./Orderlist.css"

const Orderlist = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Define table columns
  const columns = React.useMemo(() => [
    { Header: 'Invoice ID', accessor: 'invoiceId' },
    { Header: 'Order Date', accessor: 'orderDate' },
    { Header: 'Total', accessor: 'total' },
    { Header: 'Paid', accessor: 'paid' },
    { Header: 'Due', accessor: 'due' },
    { Header: 'Payment Type', accessor: 'paymentType' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: () => (
        <div>
          <FaPrint className="text-info me-2" />
          <FaEdit className="text-success me-2" />
          <FaTrash className="text-danger me-2" />
        </div>
      ),
    },
  ], []);

  // Sample data for table rows
  const data = React.useMemo(() => [
    { invoiceId: 45, orderDate: '2024-11-12', total: 309, paid: 309, due: 0, paymentType: 'Check' },
    { invoiceId: 44, orderDate: '2023-03-17', total: 1442, paid: 1500, due: 58, paymentType: 'Cash' },
    { invoiceId: 43, orderDate: '2013-03-17', total: 787.95, paid: 0, due: 787.95, paymentType: 'Cash' },
    { invoiceId: 42, orderDate: '2023-03-14', total: 206, paid: 206, due: 0, paymentType: 'Cash' },
    { invoiceId: 41, orderDate: '2023-03-14', total: 772.5, paid: 800, due: -27.5, paymentType: 'Cash' },
    { invoiceId: 40, orderDate: '2023-03-14', total: 772.5, paid: 800, due: -27.5, paymentType: 'Cash' },
    { invoiceId: 39, orderDate: '2023-03-09', total: 1081.5, paid: 1100, due: -18.5, paymentType: 'Cash' },
    { invoiceId: 38, orderDate: '2023-03-08', total: 23228.5, paid: 25000, due: -1773.5, paymentType: 'Cash' },
    { invoiceId: 37, orderDate: '2023-03-08', total: 865.2, paid: 865.2, due: 0, paymentType: 'Check' },
    { invoiceId: 36, orderDate: '2023-03-08', total: 19000.35, paid: 19000.35, due: 0, paymentType: 'Card' },
  ], []);

    return (
      <div className='admin-UserOrderList-container'>
      <UserSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-UserOrderList-content ${collapsed ? 'collapsed' : ''}`}>
      <h1>Order List</h1>
        <hr />
        <DataTable columns={columns} data={data} />
      </div>
  </div>
  )
}

export default Orderlist
