import React from 'react';

const BestSellingProduct = () => {
    const data = [
        { id: 7, name: 'Dyna Soap', qty: 33, rate: 25, total: 825 },
        { id: 1, name: 'Kangaro Stapler Pins', qty: 15, rate: 50, total: 750 },
        { id: 10, name: 'Wow Omega 3 Capsules', qty: 13, rate: 500, total: 6500 },
        { id: 8, name: 'Pepsodent Toothpaste', qty: 13, rate: 140, total: 1820 },
        { id: 2, name: 'Kangaro Stapler', qty: 11, rate: 200, total: 2200 },
        { id: 3, name: 'Kissan Tomato Ketchup', qty: 11, rate: 160, total: 1760 },
        { id: 6, name: 'Sugar Packet 5 KG', qty: 7, rate: 200, total: 1400 },
        { id: 4, name: 'Lenovo Charger', qty: 6, rate: 800, total: 4800 },
        { id: 9, name: 'Modelling Comb', qty: 6, rate: 250, total: 1500 },
        { id: 11, name: 'Realme XT', qty: 4, rate: 21500, total: 86000 },
    ];

    return (
        <div>
            <h2 className="mb-4">Best Selling Product</h2>
            <div 
                className="card" 
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff'
                }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' }}>Product ID</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' }}>Product Name</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' }}>QTY</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' }}>Rate</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.id}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.qty}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>₹{product.rate}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>₹{product.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BestSellingProduct;
