import React, {useState, useEffect} from 'react';
import { Line, Scatter } from 'react-chartjs-2';
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

import {MACHINE_DATA} from '../data'
import {extractMachines, filterHealthByMachineRange, RANGE, filterByName} from '../utils/pageFilter'
import TanStackTable from '../components/TanStackTable';
import ObservationScreen from '../components/ObservationScreen';
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
   // State for dropdowns
   const [machineDropdownValue, setMachineDropdownValue] = useState('');
   const [dropdown2Value, setDropdown2Value] = useState('Option A');
   const [summary, setSummary] = useState('');
   const machines = extractMachines(MACHINE_DATA);
   const {datesList, healthList, summaries} = filterHealthByMachineRange(MACHINE_DATA, machineDropdownValue, RANGE.DAILY);
   const data = {
        labels: datesList,
        datasets: [
            {
                label: 'Health Status',
                data: healthList,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
      },
      scales: {
          y: {
              ticks: {
                  callback: function (value) {
                      // Map numerical values to text labels
                      const labels = {
                          0: 'Normal',
                          1: 'Marginal',
                          2: 'Critical',
                      };
                      return labels[value] || value; // Default to value if not in labels
                  },
              },
              beginAtZero: true, // Optional, ensures chart starts at 0
          },
      },
      onClick: (event, elements, chart) => {
        if (elements.length > 0) {
            const clickedElementIndex = elements[0].index; // Get index of clicked point
            // const date = datesList[clickedElementIndex]; // Get the corresponding date
            // const health = healthList[clickedElementIndex]; // Get the corresponding health
            const summary = summaries[clickedElementIndex]; // Get the corresponding summary

            // Display the summary (you can replace this with your own UI logic)
            setSummary(summary)
            // console.log(`Date: ${date}\nHealth: ${health}\nSummary: ${JSON.stringify(summary)}`);
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
                    {machines.map((machine) => <option value={machine}>{machine}</option>)}
                  </select>
              </div>

              {/* Dropdown 2 */}
              <div className="flex items-center space-x-2">
                  <label htmlFor="dropdown2" className="text-gray-700 font-medium">
                      Frequency:
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
                      <Line data={data} options={options} />
                  </div>
              </div>
              {/* Image Section */}
              <div className="w-1/3 p-4 flex items-center justify-center">
                  <img
                      src="https://h2ocooling.com/wp-content/uploads/2021/11/Dynafab_FanStacks.jpg"
                      alt="Placeholder"
                      className="rounded-lg shadow"
                  />
              </div>
          </div>
        </div>
        <div>
          {summary && <ObservationScreen observation={summary['observation']} analysis={summary['analysis']} remark={summary['remarks']}/>}
        </div>
        <div>
          <TanStackTable tableData={MACHINE_DATA.filter((machine) => machine.Main_WorkCtr === machineDropdownValue)} />
        </div>
      </div>
  );
};

export default Visualizer;
