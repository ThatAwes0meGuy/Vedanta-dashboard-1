import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
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
  
//  https://iddan.github.io/react-spreadsheet/docs/usage
const ExcelTable = () => {
  const [data, setData] = useState();
  const [shouldSave, setShouldSave] = useState(true);
  useEffect(() => {
    async function fetchData() {
        try {
            const querySnapshot = await getDocs(collection(db, "health_status"));
            const isAdmin = localStorage.getItem('role') === 'ADMIN'
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", JSON.parse(doc.data().items).data);
                setData(() => 
                   JSON.parse(doc.data().items).data.map(row => 
                     row.map(col => {
                      return {...col, readOnly: !isAdmin}
                     })
                  )
                )
            });
            const users = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          } catch (error) {
            console.error('Error fetching documents: ', error);
          }
      }
      fetchData();
  }, [])
  const columnLabels = ["Observations", "Expert Analysis", "Issue Resolved"];
  const saveHandler = async () => {
    // TODO: PUSH DATA TO FIREBASE
    try {
        const collectionRef = collection(db, "health_status");

        // Fetch all existing documents
        const querySnapshot = await getDocs(collectionRef);

        // Delete each document
        const deletePromises = querySnapshot.docs.map((document) =>
            deleteDoc(doc(db, "health_status", document.id))
        );
        await Promise.all(deletePromises);

        console.log("All documents deleted successfully!");
        const docRef = await addDoc(collection(db, 'health_status'), {
            items: JSON.stringify({data})
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
      setShouldSave(false);
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
          Save {shouldSave ? '(Unsaved)': ''}
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
      <Spreadsheet data={data || [[]]} columnLabels={columnLabels} onChange={setData} className="w-full"/>
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
