import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fragment } from "react";

const CustomTable = ({ dateFrames, data, totalData }) => {
  const calculateProjectHours = (projectTime) => {
    let totalTime = 0;

    for (const timePeriod in projectTime) {
      totalTime += projectTime[timePeriod];
    }

    return totalTime;
  };

  const calculateTotalHours = (projectData) => {
    let totalTime = 0;

    for (const project in projectData) {
      const timeData = projectData[project].time;
      totalTime += calculateProjectHours(timeData);
    }
    return totalTime;
  };

  const calculateTotalCost = (projectData) => {
    let totalAmount = 0;

    for (const project in projectData) {
      totalAmount += projectData[project].cost;
    }
    return totalAmount;
  };

  const getFinalCost = (projectData) => {
    let totalAmount = 0;

    for (const project in projectData) {
      totalAmount += projectData[project].cost;
    }
    return totalAmount;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            verticalAlign: "top",
          },
        }}
      >
        <TableHead sx={{ backgroundColor: "#f7f8fc" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Hourly Rate</TableCell>
            <TableCell>Projects</TableCell>
            {dateFrames.map((dateFrame) => (
              <TableCell key={dateFrame}>{dateFrame}</TableCell>
            ))}
            <TableCell>Project Hours</TableCell>
            <TableCell>Total Hours</TableCell>
            <TableCell>Project Cost</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((name) => (
            <Fragment key={name}>
              {Object.keys(data[name].projects).map((projectName, index) => (
                <TableRow key={`${name} ${projectName}`}>
                  {!index && (
                    <>
                      <TableCell
                        rowSpan={Object.keys(data[name].projects).length}
                      >
                        {name}
                      </TableCell>
                      <TableCell
                        rowSpan={Object.keys(data[name].projects).length}
                      >
                        {data[name].hourlyCost}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{projectName}</TableCell>
                  {dateFrames.map((dateFrame) => (
                    <TableCell key={dateFrame}>
                      {data[name].projects[projectName].time[dateFrame]}
                    </TableCell>
                  ))}
                  <TableCell>
                    {calculateProjectHours(
                      data[name].projects[projectName].time
                    )}
                  </TableCell>
                  {!index && (
                    <TableCell
                      rowSpan={Object.keys(data[name].projects).length}
                    >
                      {calculateTotalHours(data[name].projects)}
                    </TableCell>
                  )}
                  <TableCell>{data[name].projects[projectName].cost}</TableCell>
                  {!index && (
                    <TableCell
                      rowSpan={Object.keys(data[name].projects).length}
                    >
                      {calculateTotalCost(data[name].projects)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </Fragment>
          ))}

          {Object.keys(totalData).map((projectName, index) => (
            <TableRow key={projectName}>
              {!index && (
                <TableCell rowSpan={Object.keys(totalData).length} colSpan={2}>
                  Total
                </TableCell>
              )}
              <TableCell>{projectName}</TableCell>
              {dateFrames.map((dateFrame) => (
                <TableCell key={dateFrame}>
                  {totalData[projectName].time[dateFrame]}
                </TableCell>
              ))}
              <TableCell>
                {calculateProjectHours(totalData[projectName].time)}
              </TableCell>
              {!index && (
                <TableCell rowSpan={Object.keys(totalData).length}>
                  {calculateTotalHours(totalData)}
                </TableCell>
              )}
              <TableCell>{totalData[projectName].cost}</TableCell>
              {!index && (
                <TableCell rowSpan={Object.keys(totalData).length}>
                  {getFinalCost(totalData)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {Object.keys(data).length === 0 && (
        <div>
          <p>No data found</p>
        </div>
      )}
    </TableContainer>
  );
};

export default CustomTable;
