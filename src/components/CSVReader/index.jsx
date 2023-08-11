import React, { useState } from "react";
import Papa from "papaparse";

const CSVReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [projects, setProjects] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const parsedData = result.data;

        const uniqueProjectKeys = [];

        parsedData.forEach((item) => {
          if (!uniqueProjectKeys.includes(item.project)) {
            if (item.project !== "") {
              uniqueProjectKeys.push(item.project);
            }
          }
        });

        setProjects(uniqueProjectKeys);
      },
    });
  };

  const applyFilters = () => {
    const filtered = csvData.filter((row) => {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const filterValue = filters[key].toLowerCase();
          const cellValue = row[key].toString().toLowerCase();
          if (!cellValue.includes(filterValue)) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (event, columnName) => {
    const updatedFilters = { ...filters, [columnName]: event.target.value };
    setFilters(updatedFilters);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="custom-button" />
      {csvData.length > 0 && (
        <div>
          {csvData[0].map((header, index) => (
            <input
              key={index}
              placeholder={`Filter ${header}`}
              onChange={(event) => handleFilterChange(event, index)}
            />
          ))}
          <button onClick={applyFilters}>Apply Filters</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {csvData[0] &&
              csvData[0].map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVReader;
