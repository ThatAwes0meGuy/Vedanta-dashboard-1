import React, {useState, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {extractMachines, filterHealthByMachineRange, RANGE, filterByName} from '../utils/pageFilter'
import ObservationScreen from '../components/ObservationScreen';
import TailwindTable from '../components/TailwindTable';
import ExcelTable from '../components/ExcelTable';
// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement for bar charts
  Title,
  Tooltip,
  Legend
);

const Visualizer = ({machineData}) => {
  console.log('machineData', machineData)
   // State for dropdowns
   const [machineDropdownValue, setMachineDropdownValue] = useState('ALH_MECH');
   const [dropdown2Value, setDropdown2Value] = useState('Daily');
   const [summary, setSummary] = useState({observation: '', analysis: ''});
   const machines = extractMachines(machineData);
   const {datesList, healthList, summaries} = filterHealthByMachineRange(machineData, machineDropdownValue, RANGE.DAILY);
   const data = {
    labels: datesList, 
    datasets: [
        {
            label: 'Health Status',
            data: healthList, 
            backgroundColor: healthList.map((value) => {
              if (value === 250) return '#A3D9A5'; 
              if (value === 500) return '#FFE9A3'; 
              if (value === 750) return '#FFB3B3'; 
              return '#D3D3D3'; 
          }),
          borderColor: healthList.map((value) => {
              if (value === 250) return '#85C987'; 
              if (value === 500) return '#FFD76B'; 
              if (value === 750) return '#FF9B9B'; 
              return '#B0B0B0'; 
          }),
            borderWidth: 1, 
        },
    ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        generateLabels: (chart) => [
          {
            text: 'Normal',
            fillStyle: '#A3D9A5',
            strokeStyle: '#85C987',
            hidden: false,
            lineWidth: 1,
          },
          {
            text: 'Marginal',
            fillStyle: '#FFE9A3',
            strokeStyle: '#FFD76B',
            hidden: false,
            lineWidth: 1,
          },
          {
            text: 'Critical',
            fillStyle: '#FFB3B3',
            strokeStyle: '#FF9B9B',
            hidden: false,
            lineWidth: 1,
          },
        ],
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      ticks: {
        display: false, // Hide Y-axis values
      },
      grid: {
        drawTicks: false, // Optional: Hide tick marks on the Y-axis
      },
    },
  },
  onClick: (event, elements, chart) => {
    if (elements.length > 0) {
      // Get the index of the clicked bar
      const barIndex = elements[0].index;
      setSummary(summaries[barIndex])
    }
  },
};

    return (
      <div className='flex flex-col'>
        <div className="flex flex-col p-8 bg-gray-100">
          {/* Dropdowns */}
          <div className="flex items-center mb-6">
              {/* Dropdown 1 */}
              <div className="flex items-center space-x-2 mx-12">
                  <label htmlFor="machineDropdownValue" className="text-gray-700 font-medium">
                      Machine:
                  </label>
                  <select
                      id="machineDropdownValue"
                      value={machineDropdownValue}
                      onChange={(e) => setMachineDropdownValue(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {machines?.map((machine) => <option value={machine}>{machine}</option>)}
                  </select>
              </div>

              {/* Dropdown 2 */}
              <div className="flex items-center space-x-2">
                  <label htmlFor="dropdown2" className="text-gray-700 font-medium">
                      Duration:
                  </label>
                  <select
                      id="dropdown2"
                      value={dropdown2Value}
                      onChange={(e) => setDropdown2Value(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                      <option value="Monthly">Monthly</option>
                      <option value="Daily">Daily</option>
                  </select>
              </div>
          </div>

          {/* Chart and Image Section */}
          <div className="flex flex-wrap">
              {/* Chart Section */}
              <div className="w-2/3 p-4">
                  <h2 className="text-xl font-bold mb-4">Health Dashboard</h2>
                  <div className="bg-white p-6 rounded-lg shadow">
                      <Bar data={data} options={options} />
                  </div>
              </div>
              {/* Image Section */}
              <div className="w-1/3 p-4 flex items-center justify-center">
                  <img
                      src="https://tryengineering.org/wp-content/uploads/bigstock-Industrial-Robotic-Arm-19973981-1024x1024.jpg"
                      alt="Placeholder"
                      className="rounded-lg shadow"
                  />
              </div>
          </div>
        </div>
        <div>
        <TailwindTable observation={summary?.observation} analysis={summary?.analysis}/>
        </div>
      </div>
  );
};

export default Visualizer;
