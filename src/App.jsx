import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import TanStackTable from './components/TanStackTable';
import NavBar from './components/NavBar';
import ClimbingBoxLoader from "react-spinners/ClipLoader";

import { db } from './firebase';
import Login from './pages/LoginPage';
import SignUp from './components/Signup';
import ProtectedRoute from "./hooks/ProtectedRoute";
import { AuthProvider } from './hooks/AuthContext';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from '@firebase/firestore';
import FullTable from './components/FullTable';

const App = () => {
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnLabels = [
    'Sl_No',
    'Date_of_Visit',
    'Main_WorkCtr',
    'Equip_Tag_No',
    'Frequency',
    'Critical_Limit',
    'Drive_Driven_Max_Vibrations',
    'Health_Status',
    'Observations_Analysis',
    'Recommendations',
    'Remarks'
  ]

  useEffect(() => {
    const fetchMachineData = async () => {
      setLoading(true)
      const machineQuery = query(collection(db, 'machine_health'), limit(4));
      const querySnapshot = await getDocs(machineQuery);
      querySnapshot.forEach(doc => setMachineData(prev => {
        if(machineData.length > 20) return
        let sortedArr = doc.data()?.data ? Object.entries(doc.data()?.data) : [];
        // console.log('sortedArrBefore', sortedArr)
        sortedArr.sort((a, b) => {
          console.log(`Comparing: ${a[0]} (${columnLabels.indexOf(a[0])}) and ${b[0]} (${columnLabels.indexOf(b[0])})`);
          return columnLabels.indexOf(a[0]) - columnLabels.indexOf(b[0]);
      });
        // console.log('sortedArrAfter', sortedArr)
        return [...prev, sortedArr.map(([key, value]) =>  ({ "value": value }) )]
      }
      ))
      setLoading(false)
    }
    fetchMachineData();
  }, [])
  if(loading) return  <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="relative w-1/3 h-2 bg-gray-300 rounded-full overflow-hidden">
    <h1>LOADING...</h1>
    <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse w-1/2"></div>
  </div>
</div>
  return (
    <>
    <AuthProvider>
      <NavBar />
      <Routes>
        {/* {<Route path="/table" element={<ProtectedRoute><TanStackTable tableData={machineData}/></ProtectedRoute>} />} */}
        {<Route path="/table1" element={<ProtectedRoute><FullTable columnLabels={columnLabels} tableData={machineData}/></ProtectedRoute>} />}
        {<Route path="/table2" element={<ProtectedRoute><FullTable columnLabels={columnLabels} tableData={machineData}/></ProtectedRoute>} />}
        {<Route path="/table3" element={<ProtectedRoute><FullTable columnLabels={columnLabels} tableData={machineData}/></ProtectedRoute>} />}
        {<Route path="/visualize" element={<ProtectedRoute><Visualize /></ProtectedRoute>} />}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
