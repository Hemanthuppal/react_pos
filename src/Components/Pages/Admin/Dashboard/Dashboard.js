import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import AdminSidebar from '../../../Shared/AdminSidebar/Sidebar';
import './Dashboard.css';
import { FaArrowRight } from 'react-icons/fa';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import BestSellingProduct from '../Dashboard/BestSellingProduct';
import EarningByDate from '../Dashboard/EarningByDate';

// Register the necessary chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    // Bar chart data
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Earnings ($)',
                data: [3000, 4000, 5000, 4500, 4800, 5200],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Bar chart options
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Earnings',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="d-flex vh-100 overflow-hidden">
            <AdminSidebar onToggleSidebar={setCollapsed} />
            <div
                className={`admin-dashboard-content ${collapsed ? 'collapsed' : ''} flex-grow-1 p-4 overflow-auto`}
                style={{ marginLeft: collapsed ? '80px' : '250px' }}
            >
                {/* Add heading with more margin and reduced font size */}
                <h2 className="mb-4" style={{ marginTop: '50px', marginLeft: '50px', fontSize: '1.8rem' }}>
                    Admin Dashboard
                </h2>

                {/* Row for the cards */}
                <div className="row mb-4 d-flex justify-content-between">
                    <div className="col-md-3 mb-3">
                        <div
                            className="card bg-primary text-white text-center d-flex align-items-center justify-content-center"
                            style={{ width: '300px', height: '130px' }}
                        >
                            <h4 className="m-0">35</h4>
                            <small>Total Invoice</small>
                            <button className="btn text-white mt-3">
                                More Info
                                <span className="btn-icon-circle ml-2">
                                    <FaArrowRight />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div
                            className="card bg-success text-white text-center d-flex align-items-center justify-content-center"
                            style={{ width: '300px', height: '130px' }}
                        >
                            <h4 className="m-0">112,017.65</h4>
                            <small>Total Earnings</small>
                            <button className="btn text-white mt-3">
                                More Info
                                <span className="btn-icon-circle ml-2">
                                    <FaArrowRight />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div
                            className="card bg-warning text-white text-center d-flex align-items-center justify-content-center"
                            style={{ width: '300px', height: '130px' }}
                        >
                            <h4 className="m-0">12</h4>
                            <small>Total Product</small>
                            <button className="btn text-white mt-3">
                                More Info
                                <span className="btn-icon-circle ml-2">
                                    <FaArrowRight />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div
                            className="card bg-danger text-white text-center d-flex align-items-center justify-content-center"
                            style={{ width: '300px', height: '130px' }}
                        >
                            <h4 className="m-0">19</h4>
                            <small>Category</small>
                            <button className="btn text-white mt-3">
                                More Info
                                <span className="btn-icon-circle ml-2">
                                    <FaArrowRight />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Earning By Date section with bar chart */}
                <div className="earning-section" style={{ marginLeft: '50px' }}>
                    <h2 className="mb-3" style={{ fontSize: '1.5rem' }}>Earning By Date</h2>
                    <div className="chart-container d-flex justify-content-center">
                        <Bar data={barChartData} options={barChartOptions} style={{ width: '80%', height: '400px' }} />
                    </div>
                </div>

                {/* Row for BestSellingProduct and EarningByDate */}
                <div className="row mt-4">
                    <div className="col-md-6 mb-3" style={{ paddingTop: '20px' }}>
                        <div style={{ marginTop: '45px', minHeight: '350px' }}>
                            <BestSellingProduct />
                        </div>
                    </div>
                    <div className="col-md-6 mb-1" style={{ paddingTop: '20px' }}>
                        <div style={{ marginTop: '20px', minHeight: '350px' }}>
                            <EarningByDate />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
