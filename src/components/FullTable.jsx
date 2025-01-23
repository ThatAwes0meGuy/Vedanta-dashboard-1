import { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";

const FullTable = ({columnLabels, tableData}) => {
    const isAdmin = localStorage.getItem('role') === 'ADMIN'
    const [deltaRowsDispatch, setDeltaRowsDispatch] = useState([])
    useEffect(() => {
        const dispatcher = () => {
            // Dispatch the updated rows to firebase by serial No
            console.log('deltaRowsDispatch', deltaRowsDispatch)
            // Reload the page
        }
        dispatcher()
    }, [deltaRowsDispatch])
    const spreadSheetChangeHandler = (changedRows) => {
        const deltaRows = findDelta(tableData, changedRows);
        console.log('deltaRows', deltaRows)
        setDeltaRowsDispatch(deltaRows)
    }
    const handleAddRow = () => {}
    return<div className="p-4 bg-gray-100 rounded-lg shadow-md">
    {/* Header with buttons */}
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Health Check table</h2>
        {
            isAdmin && <div className="space-x-2">
            <button 
                onClick={handleAddRow} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Add new observation
            </button>
            <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Upload Excel
            </button>
            <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Save
            </button>
        </div>
        }
    </div>
    {/* Table */}
    <div className="overflow-auto">
        {tableData.length ? (
            <Spreadsheet 
                columnLabels={columnLabels} 
                data={tableData} 
                onChange={spreadSheetChangeHandler}
            />
        ) : (
            <p className="text-gray-500">No data available</p>
        )}
    </div>
</div>

}

// machineData -> tableData => newTableData -> machineData
export default FullTable