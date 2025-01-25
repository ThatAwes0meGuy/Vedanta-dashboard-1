import React, {useState, useContext, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment/moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {extractMachines, filterHealth, RANGE, extractPlants, extractEquipment} from '../utils/pageFilter'
import TailwindTable from '../components/TailwindTable';
import { Dropdown } from '../components/Dropdown';
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
   // State for dropdowns
   const [filteredMachineData, setFilteredMachineData] = useState(machineData)
   const [machineDropdownValue, setMachineDropdownValue] = useState('');
   const [plantDropdown, setPlantDropdown] = useState('');
   const [equipmentDropdown, setEquipmentDropdown] = useState('')
   const [dateFilters, setDateFilters] = useState({
     startDate: moment(new Date()).format("DD/MM/YYYY"),
     endDate: moment(new Date()).format("DD/MM/YYYY")
    })

   
   const [summary, setSummary] = useState({observation: '', analysis: '', equipment: ''});
   const machines = extractMachines(filteredMachineData, {
    machineDropdownValue,
    plantDropdown,
    equipmentDropdown
   });
   if(machines.length === 0) setMachineDropdownValue('')
   const equipments = extractEquipment(filteredMachineData, {
    machineDropdownValue,
    plantDropdown,
    equipmentDropdown
   })
   const plants = extractPlants();

   const {datesList, healthList, summaries} = filterHealth(filteredMachineData, machineDropdownValue, plantDropdown, dateFilters);
   
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
            <div className="flex items-center mx-6">
                  <Dropdown 
                      dropdownLabel="Plant"
                      dropdownList={plants}
                      currentValue={plantDropdown}
                      setDropdownValue={setPlantDropdown}
                  />
              </div>
              {/* Dropdown 2 */}
              <div className="flex items-center mx-6">
                  <Dropdown 
                    dropdownLabel="Area"
                    dropdownList={machines}
                    currentValue={machineDropdownValue}
                    setDropdownValue={setMachineDropdownValue}
                  />
              </div>

               {/* Dropdown start date */}
               <div className="flex items-center mx-6">
                  <label htmlFor="start-date" className="text-gray-700 font-medium">
                      Start Date:
                  </label>
                  <input 
                    type="date"
                    id="start-date"
                    name="start-date"
                    value={dateFilters.startDate}
                    min="2018-01-01"
                    max="2025-12-31" 
                    onChange={(e) => setDateFilters(p => ({...p, startDate: e.target.value}))}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
              </div>
               
               {/* Dropdown end date */}
               <div className="flex items-center mx-6">
                  <label htmlFor="end-date" className="text-gray-700 font-medium">
                      End Date:
                  </label>
                  <input 
                  type="date"
                  id="end-date" name="end-date" 
                  value={dateFilters.endDate} min="2018-01-01" max="2025-12-31" 
                  onChange={(e) => setDateFilters(p => ({...p, endDate: e.target.value}))}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>

               {/* Dropdown 3 */}
               <div className="flex items-center mx-6">
                  <Dropdown 
                    dropdownLabel="Equipment"
                    dropdownList={equipments}
                    currentValue={equipmentDropdown}
                    setDropdownValue={setEquipmentDropdown}
                  />
              </div>

              {/* Dropdown 4 */}
              <div className="flex items-center mx-6">
                <b className='mr-2'>Drive/Driven</b> {summary?.driveDriven}
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
        <TailwindTable observation={summary?.observation} analysis={summary?.analysis} equipment={summary?.equipment}/>
        </div>
      </div>
  );
};

export default Visualizer;
