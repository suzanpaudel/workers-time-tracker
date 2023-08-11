import { useEffect, useState } from "react";
import Papa from "papaparse";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Header from "./components/Header";

import csvFile from "./assets/TrackedTime.csv";
import FilterComponent from "./components/FilterComponent";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [projects, setProjects] = useState([]);

  const importCSV = () => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data;
        parsedData.forEach((item) => {
          if (!uniqueProjectKeys.includes(item.project)) {
            if (item.project !== "") {
              uniqueProjectKeys.push(item.project);
            }
          }
        });

        setProjects(uniqueProjectKeys);
        setCsvData(result.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error.message);
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Header clickImport={importCSV} />
        <FilterComponent />
      </Container>
    </LocalizationProvider>
  );
};

export default App;

// // <DatePicker value={value} onChange={(newValue) => setValue(newValue)} label="Start Date" />

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";

// function App() {
//   const [rows, setRows] = React.useState(null);

//   return (
//     <div>
//       <h1>CSV Data</h1>
//       {/* <ul>
//         {data.map((entry, index) => (
//           <li key={index}>{JSON.stringify(entry)}</li>
//         ))}
//       </ul> */}
//     </div>
//   );
// }

// export default App;
