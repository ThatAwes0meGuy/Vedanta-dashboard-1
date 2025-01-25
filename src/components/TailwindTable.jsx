import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TailwindTable = ({ observation, analysis }) => {
  const observationTable = [
    {label: "Observation & Analysis", text: observation},
    {label: "Recommendations", text: analysis},
    {label: "Remarks", text: ""}
  ]
  // Handle download as PDF
  const handleDownloadPDF = async () => {
    const element = document.getElementById("print-area");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("health_dashboard.pdf");
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center w-full py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full max-w-8xl px-12 mb-4">
        <h1 className="text-2xl font-bold">Health Observation</h1>
        <button
          // onClick={handleDownloadPDF}
          onClick={() => window.print()}
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Download report
        </button>
      </div>

      {/* Table Section */}
      <div id="print-area" className="w-full max-w-8xl mx-4 px-12">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/2">Observation</th>
              <th className="px-4 py-2 text-left w-1/2">Observed Value</th>
            </tr>
          </thead>
          <tbody>
            {
              observationTable.map(({label, text}) =>  
              <tr className="border-b">
                <td className="px-8 py-6 w-1/2">
                  {label}
                </td>
                <td className="px-4 py-6 w-1/2">
                {text.length ? text : "NA"}
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TailwindTable;
