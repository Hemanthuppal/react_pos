import React from 'react';
import DataTable from '../../../DataTable/DataTable';

const EarningByDate = () => {
    const columns = [
        { Header: 'Invoice ID', accessor: 'invoiceId' },
        { Header: 'Order Date', accessor: 'orderDate' },
        { Header: 'Total', accessor: 'total' },
        { Header: 'Payment Type', accessor: 'paymentType' },
    ];

    const data = [
        { invoiceId: 45, orderDate: '2024-11-12', total: 309, paymentType: 'Check' },
        { invoiceId: 44, orderDate: '2023-03-17', total: 1442, paymentType: 'Cash' },
        { invoiceId: 43, orderDate: '2023-03-17', total: 787.95, paymentType: 'Cash' },
        { invoiceId: 42, orderDate: '2023-03-14', total: 206, paymentType: 'Card' },
        { invoiceId: 41, orderDate: '2023-03-14', total: 772.5, paymentType: 'Cash' },
        { invoiceId: 40, orderDate: '2023-03-09', total: 772.5, paymentType: 'Cash' },
        { invoiceId: 39, orderDate: '2023-03-09', total: 1081.5, paymentType: 'Cash' },
        { invoiceId: 38, orderDate: '2023-03-08', total: 23226.5, paymentType: 'Cash' },
        { invoiceId: 37, orderDate: '2023-03-08', total: 865.2, paymentType: 'Check' },
        { invoiceId: 36, orderDate: '2023-03-08', total: 1900.35, paymentType: 'Card' },
    ];

    return (
        <div>
            <h2>Earning By Date</h2>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default EarningByDate;
