import { useEffect, useState } from "react";
import Papa from "papaparse";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Header from "./components/Header";

// import csvData from "./assets/TrackedTime.csv";

const App = () => {
  // const [csvData, setCsvData] = useState([]);

  // useEffect(() => {
  //   Papa.parse("../src/assets/TrackedTime.csv", {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: (result) => {
  //       console.log(result.data)
  //     },
  //     error: (error) => {
  //       console.error("Error parsing CSV:", error.message);
  //     },
  //   });
  // }, []);

  useEffect(() => {
    Papa.parse("../src/assets/TrackedTime.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (data) => {
        console.log(data.data);
        // setRows(data.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error.message);
      },
    });
  }, []);

  const importCSV = () => {
    console.log("importCSV");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Header clickImport={importCSV} />
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
