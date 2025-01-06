import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, // For the x-axis (category scale)
    LinearScale,   // For the y-axis (linear scale)
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Visualizer = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };

    return (
        <div className="flex flex-wrap p-8 bg-gray-100">
            {/* Chart Section */}
            <div className="w-full md:w-2/3 p-4">
                <h2 className="text-xl font-bold mb-4">Line Chart</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                    <Line data={data} options={options} />
                </div>
            </div>
            {/* Image Section */}
            <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
                <img
                    src="https://via.placeholder.com/300"
                    alt="Placeholder"
                    className="rounded-lg shadow"
                />
            </div>
        </div>
    );
};

export default Visualizer;
