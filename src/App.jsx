import { Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import NavBar from './components/NavBar';
import { MyContext } from "./MyContext";

import { db } from './firebase';
import Login from './pages/LoginPage';
import SignUp from './pages/Signup';
import ProtectedRoute from "./hooks/ProtectedRoute";
import { AuthProvider } from './hooks/AuthContext';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, startAfter } from '@firebase/firestore';
import FullTable from './components/FullTable';

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null); // Track the last document for pagination
  const [hasMore, setHasMore] = useState(true); // To manage "Next" button visibility

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
  ];

  const fetchMachineData = async (loadMore = false) => {
    if (loading) return; // Prevent duplicate calls while loading
    setLoading(true);

    try {
      // Build query with or without pagination
      let machineQuery;
      if (loadMore && lastDoc) {
        machineQuery = query(
          collection(db, 'machine_health'),
          startAfter(lastDoc),
          limit(20)
        );
      } else {
        machineQuery = query(collection(db, 'machine_health'), limit(20));
      }

      const querySnapshot = await getDocs(machineQuery);

      // Check if more data exists
      if (querySnapshot.empty) {
        setHasMore(false);
      } else {
        const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(newLastDoc); // Update the last document for the next query

        // Process data
        querySnapshot.forEach((doc) => {
          setMachineData(p => [...p, doc.data()?.data])
          setTableData((prev) => {
            let sortedArr = doc.data()?.data
              ? Object.entries(doc.data()?.data)
              : [];
            sortedArr.sort((a, b) => {
              return columnLabels.indexOf(a[0]) - columnLabels.indexOf(b[0]);
            });
            return [
              ...prev,
              sortedArr.map(([key, value]) => ({ value })),
            ];
          });
        });
      }
    } catch (error) {
      console.error('Error fetching machine data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachineData();
  }, []);

  if (loading && tableData.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-1/3 h-2 bg-gray-300 rounded-full overflow-hidden">
          <h1>LOADING...</h1>
          <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse w-1/2"></div>
        </div>
      </div>
    );
      const IS_ADMIN = localStorage.getItem('role') === 'ADMIN'
  return (
    <MyContext.Provider value={{ tableData, setTableData }}>
      <AuthProvider>
        <NavBar />
        <Routes>
          {IS_ADMIN && <Route
            path="/table1"
            element={
              <ProtectedRoute>
                <FullTable columnLabels={columnLabels} tableData={tableData} />
                {hasMore && (
                  <button
                    onClick={() => fetchMachineData(true)}
                    disabled={loading}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                  >
                    Load More
                  </button>
                )}
              </ProtectedRoute>
            }
          />}
          {IS_ADMIN && <Route path="/table2" element={<ProtectedRoute><FullTable columnLabels={columnLabels} tableData={tableData} /></ProtectedRoute>} />}
          {IS_ADMIN&& <Route path="/table3" element={<ProtectedRoute><FullTable columnLabels={columnLabels} tableData={tableData} /></ProtectedRoute>} />}
          <Route path="/visualize" element={<ProtectedRoute><Visualize machineData={machineData} /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home machineData={machineData}/>} />
        </Routes>
      </AuthProvider>
    </MyContext.Provider>
  );
};

export default App;
