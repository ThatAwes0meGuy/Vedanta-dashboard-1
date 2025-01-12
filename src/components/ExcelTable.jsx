import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import CustomCell from './CustomCell'
import './CustomStyles.css'; // Import your custom styles
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from 'firebase/firestore';
  import { db } from '../firebase'; // Import your Firebase configuration
import { use } from "react";
  
//  https://iddan.github.io/react-spreadsheet/docs/usage

  
const ExcelTable = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Chocolate" }],
  ]);
  useEffect(async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'health_status'));
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Users: ', users);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
  }, [])
  const columnLabels = ["Observations", "Expert Analysis", "Issue Resolved"];
  const saveHandler = async () => {
    // TODO: PUSH DATA TO FIREBASE
    try {
        const docRef = await addDoc(collection(db, 'health_status'), data);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
  }
  const addRowHandler = () => {
    setData((prevData) => [...prevData, [{ value: "" }, { value: "" }, { value: "" }]]);
  };

  const deleteRowHandler = () => {
    setData(prevData => prevData.slice(0, -1))
  }
  return (
    <div className="bg-gray-100 flex flex-col items-center w-full py-8">
        {/* Header Section */}
      <div className="flex space-between center w-full max-w-8xl px-12 mb-4">
      <h1 className="text-2xl font-bold mr-auto">Health Observation</h1>
      <button
          className="bg-green-500 text-white font-medium mr-6 px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
          onClick={saveHandler}
        >
          Save
        </button>
        <button
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 mr-6"
         onClick={addRowHandler}>
          Add row
        </button>
        <button
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
          onClick={deleteRowHandler}
        >
          Delete row
        </button>
       
      </div>
      <Spreadsheet data={data} columnLabels={columnLabels} onChange={setData} className="w-full"/>
      {/* <button
        style={{
          marginTop: "10px",
          backgroundColor: "#3498db",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={addRowHandler}
      >
        Add Row 
      </button>*/}
    </div>
  );
};

export default ExcelTable;
