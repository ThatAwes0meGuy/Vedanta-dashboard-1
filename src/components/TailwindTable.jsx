import React, {useState, useEffect} from "react";

const TailwindTable = ({observation, analysis}) => {
    const [textArea, setTextArea] = useState(analysis);

    // Sync state with prop when prop changes
    useEffect(() => {
      setTextArea(analysis);
    }, [analysis]);
  
    return (
    <div className="bg-gray-100 flex items-center justify-center w-full py-8">
      <div className="w-full max-w-7xl mx-4">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/2">Observations</th>
              <th className="px-4 py-2 text-left w-1/2">Expert Analysis</th>
              <th className="px-4 py-2 text-left w-1/4">Issue Resolved</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 w-1/2">
                {observation.length ? observation : "Shift 1 observation"}
              </td>
              <td className="px-4 py-2 w-1/2">
                <textarea
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows="3"
                  value={textArea}
                  onChange={(e) => setTextArea(e.target.value)}
                  placeholder="Enter expert analysis"
                ></textarea>
              </td>
              <td className="px-4 py-2 w-1/4">
                <div className="flex">
                  <input type="checkbox" id="Resolved_obs" className="peer hidden" />
                  <label
                    htmlFor="Resolved_obs"
                    className="select-none cursor-pointer rounded-lg py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-green-200 peer-checked"
                  >
                    Mark as resolved
                  </label>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="border-b">
              <td className="px-4 py-2 w-1/2">Shift 2 Observation</td>
              <td className="px-4 py-2 w-1/2">
                <textarea
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows="3"
                  placeholder="Enter expert analysis"
                ></textarea>
              </td>
              <td className="px-4 py-2 w-1/4">
                <div className="flex">
                  <input type="checkbox" id="Resolved_ex" className="peer hidden" />
                  <label
                    htmlFor="Resolved_ex"
                    className="select-none cursor-pointer rounded-lg py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-green-200 peer-checked"
                  >
                    Mark as resolved
                  </label>
                </div>
              </td>
            </tr>
            {/* Row 3 */}
            <tr>
              <td className="px-4 py-2 w-1/2">Shift 3 Observation</td>
              <td className="px-4 py-2 w-1/2">
                <textarea
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows="3"
                  placeholder="Enter expert analysis"
                ></textarea>
              </td>
              <td className="px-4 py-2 w-1/4">
                <div className="flex">
                  <input type="checkbox" id="Resolved_iss" className="peer hidden" />
                  <label
                    htmlFor="Resolved_iss"
                    className="select-none cursor-pointer rounded-lg py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-green-200 peer-checked"
                  >
                    Mark as resolved
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TailwindTable;
