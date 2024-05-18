import React from "react";

const MatrixDisplay = ({
  matrix1,
  matrix2,
  days = ["Mon", "Tue", "Wed", "Thu", "Fri"],
}) => {
  const periods = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

  return (
    <div className="flex flex-col md:flex-row justify-center mt-10">
      <table className="border border-collapse m-2">
        <thead>
          <tr>
            <th className="p-2">Days</th>
            {periods.map((period) => (
              <th key={period} className="p-2">
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix1.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={`day-${rowIndex}`} className="p-2">
                {days[rowIndex]}
              </td>
              {row.map((value, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="p-2 hover:bg-gray-200"
                >
                  {value}
                </td>
              ))}
              <td
                className="p-2"
                style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
              >
                {rowIndex === 3 ? "BREAK" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="border border-collapse m-2">
        <thead>
          <tr>
            <th className="p-2">Days</th>
            {periods.map((period) => (
              <th key={period} className="p-2">
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix2.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={`day-${rowIndex}`} className="p-2">
                {days[rowIndex]}
              </td>
              {row.map((value, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="p-2 hover:bg-gray-200"
                >
                  {value}
                </td>
              ))}
              <td
                className="p-2"
                style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
              >
                {rowIndex === 3 ? "B\nR\nE\nA\nK" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixDisplay;
