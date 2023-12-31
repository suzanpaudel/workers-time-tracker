import { useState } from "react";
import Papa from "papaparse";
import { Box, Button, Container } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Header from "./components/Header";
import CustomTable from "./components/CustomTable";
import FilterComponent from "./components/FilterComponent";
import getMonthFromString from "./utils/getMonthFromString";

import csvFile from "./assets/TrackedTime.csv";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [frequency, setFrequency] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [dateFrames, setDateFrames] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [totalData, setTotalData] = useState({});

  const getHourlyRates = () => ({
    "Prakash Sharma": 1000,
    "Sagun Karanjit": 900,
    "Steve Jobs": 800,
    "Dan Abrahamov": 700,
    "Mausam Khanal": 600,
  });

  const hourlyRates = getHourlyRates();

  const formatDateRange = (start, end) => {
    const startDate = start.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    });
    const endDate = end.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    });
    return `${startDate} - ${endDate}`;
  };

  const calculateDateFrame = () => {
    if (startDate && endDate && frequency) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const dateFrame = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        const rangeStart = new Date(currentDate);
        let rangeEnd;

        if (frequency === "Weekly") {
          rangeEnd = new Date(rangeStart);
          rangeEnd.setDate(rangeEnd.getDate() + 6);
        } else if (frequency === "Bi-weekly") {
          rangeEnd = new Date(rangeStart);
          rangeEnd.setDate(rangeEnd.getDate() + 13);
        } else if (frequency === "Monthly") {
          rangeEnd = new Date(
            rangeStart.getFullYear(),
            rangeStart.getMonth() + 1,
            0
          );
        } else if (frequency === "Bi-Monthly") {
          rangeEnd = new Date(
            rangeStart.getFullYear(),
            rangeStart.getMonth() + 2,
            0
          );
        }

        if (rangeEnd > end) {
          rangeEnd = new Date(end);
        }

        dateFrame.push(formatDateRange(rangeStart, rangeEnd));
        currentDate = new Date(rangeEnd);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dateFrame;
    }
  };

  const getGroupedAndConvertedData = (data) =>
    Object.keys(data).reduce((acc, worker) => {
      acc[worker] = { projects: {} };
      acc[worker]["hourlyCost"] = hourlyRates[worker] || 0;

      Object.keys(data[worker]).forEach((project) => {
        acc[worker].projects[project] = { time: {}, cost: 0 };
        Object.keys(data[worker][project]).forEach((frame) => {
          const durationInSeconds = data[worker][project][frame];
          const durationInHours = Math.round(durationInSeconds / 3600);
          acc[worker].projects[project].time[frame] = durationInHours;
          const hourlyRate = hourlyRates[worker] || 0;
          const totalCost = durationInHours * hourlyRate;
          acc[worker].projects[project].cost += totalCost;
        });
      });

      return acc;
    }, {});

  const getOverAllProjectData = (data) => {
    const projectData = {};
    Object.keys(data).forEach((worker) => {
      const hourlyRate = data[worker].hourlyCost;

      Object.keys(data[worker].projects).forEach((project) => {
        if (!projectData[project]) {
          projectData[project] = {
            time: {},
            cost: 0,
          };
        }

        Object.keys(data[worker].projects[project].time).forEach((frame) => {
          if (!projectData[project].time[frame]) {
            projectData[project].time[frame] = 0;
          }

          const hours = data[worker].projects[project].time[frame];
          const cost = hours * hourlyRate;
          projectData[project].time[frame] += hours;
          projectData[project].cost += cost;
        });
      });
    });
    return projectData;
  };

  const setInitialData = (data) => {
    const groupedData = data
      .slice(1)
      .filter((item) => item.workers !== "")
      .reduce((acc, item) => {
        const worker = item.workers;
        const project = item.project;
        const matchingFrame = "All";
        if (!acc[worker]) {
          acc[worker] = {};
        }

        if (!!project) {
          if (!acc[worker][project]) {
            acc[worker][project] = {};
          }
          if (!acc[worker][project][matchingFrame]) {
            acc[worker][project][matchingFrame] = 0;
          }
          const durationInSeconds = parseInt(item.duration_seconds);
          acc[worker][project][matchingFrame] += durationInSeconds;
        }
        return acc;
      }, {});

    const groupedAndConvertedData = getGroupedAndConvertedData(groupedData);

    const projectData = getOverAllProjectData(groupedAndConvertedData);

    setFinalData(groupedAndConvertedData);
    setTotalData(projectData);
  };

  const importCSV = () => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data;
        setCsvData(parsedData);

        const uniqueProjects = new Set(
          parsedData.map((item) => item.project).filter(Boolean)
        );
        setProjects(Array.from(uniqueProjects));

        setInitialData(parsedData);

        alert("CSV has been imported.");
      },
      error: (error) => {
        console.error("Error parsing CSV:", error.message);
      },
    });
  };

  const filterDataHandler = () => {
    if (csvData.length === 0 || !frequency || !startDate || !endDate) {
      alert("Import CSV first then select start date, end date and frequency");
      return;
    }

    const computedDateFrames = calculateDateFrame();

    const filteredData = csvData.slice(1).filter((item) => {
      const startTime = new Date(item.start_time);
      const endTime = new Date(item.end_time);

      const isWithinDateRange = startTime >= startDate && endTime <= endDate;
      let isMatchingProject = true;
      if (selectedProjects.length > 0) {
        isMatchingProject = selectedProjects.includes(item.project);
      }
      return isWithinDateRange && isMatchingProject;
    });

    const groupedData = filteredData.reduce((acc, item) => {
      const worker = item.workers;
      const project = item.project;
      const startTime = new Date(item.start_time);

      const matchingFrame = computedDateFrames.find((frame) => {
        const [frameStart, frameEnd] = frame.split(" - ");
        const [frameStartMonthStr, frameStartDateStr] = frameStart.split(" ");
        const [frameEndMonthStr, frameEndDateStr] = frameEnd.split(" ");
        const frameStartMonth = getMonthFromString(frameStartMonthStr);
        const frameEndMonth = getMonthFromString(frameEndMonthStr);

        const frameStartDate = new Date(
          startTime.getFullYear(),
          frameStartMonth,
          parseInt(frameStartDateStr)
        );

        const frameEndDate = new Date(
          startTime.getFullYear(),
          frameEndMonth,
          parseInt(frameEndDateStr) + 1
        );

        return startTime >= frameStartDate && startTime < frameEndDate;
      });

      if (!matchingFrame) return acc;

      if (!acc[worker]) {
        acc[worker] = {};
      }
      if (!acc[worker][project]) {
        acc[worker][project] = {};
      }
      if (!acc[worker][project][matchingFrame]) {
        acc[worker][project][matchingFrame] = 0;
      }

      const durationInSeconds = parseInt(item.duration_seconds);
      acc[worker][project][matchingFrame] += durationInSeconds;

      return acc;
    }, {});

    const groupedAndConvertedData = getGroupedAndConvertedData(groupedData);

    const projectData = getOverAllProjectData(groupedAndConvertedData);

    setFinalData(groupedAndConvertedData);
    setTotalData(projectData);
    setDateFrames(computedDateFrames);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFrequency("");
    setSelectedProjects([]);
    setDateFrames([]);
    setInitialData(csvData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Header clickImport={importCSV} />
        <FilterComponent
          projects={projects}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          frequency={frequency}
          setFrequency={setFrequency}
          selectedProjects={selectedProjects}
          setSelectedProjects={setSelectedProjects}
        />
        <Box
          sx={{
            marginBottom: "1rem",
          }}
        >
          <Button
            onClick={filterDataHandler}
            variant="contained"
            color="primary"
            sx={{
              marginRight: "1rem",
              textTransform: "none",
            }}
          >
            Filter Data
          </Button>
          <Button
            onClick={resetFilters}
            variant="outlined"
            color="primary"
            sx={{
              marginRight: "1rem",
              textTransform: "none",
            }}
          >
            Reset Filter
          </Button>
        </Box>
        <CustomTable
          data={finalData}
          dateFrames={dateFrames}
          totalData={totalData}
        />
      </Container>
    </LocalizationProvider>
  );
};

export default App;
