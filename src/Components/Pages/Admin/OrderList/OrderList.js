import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import DataTable from '../../../DataTable/DataTable';
import { FaPrint, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './OrderList.css';

const OrderList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(
    () => [
      { Header: 'Invoice ID', accessor: 'invoice_id' },
      { Header: 'Order Date', accessor: 'orderdate' },
      { Header: 'Subtotal', accessor: 'subtotal' },
      { Header: 'Discount', accessor: 'discount' },
      { Header: 'SGST', accessor: 'sgst' },
      { Header: 'CGST', accessor: 'cgst' },
      { Header: 'Total', accessor: 'total' },
      { Header: 'Payment Type', accessor: 'payment_type' },
      { Header: 'Due', accessor: 'due' },
      { Header: 'Paid', accessor: 'paid' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <FaPrint className="text-info me-2" onClick={() => handlePrint(row.original)} />
            <FaEdit className="text-success me-2" onClick={() => handleEdit(row.original)} />
            <FaTrash className="text-danger me-2" onClick={() => handleDelete(row.original)} />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePrint = (order) => {
    console.log('Printing order:', order);
  };

  const handleEdit = (order) => {
    console.log('Editing order:', order);
  };

  const handleDelete = (order) => {
    console.log('Deleting order:', order);
  };

  return (
    <div className="admin-Order-container">
      <AdminSidebar onToggleSidebar={setCollapsed} />
      <div className={`admin-Order-content ${collapsed ? 'collapsed' : ''}`}>
        <h1>Order List</h1>
        <hr />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={orders} />
        )}
      </div>
    </div>
  );
};

export default OrderList;
