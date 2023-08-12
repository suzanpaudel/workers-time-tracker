import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";

import FrequencySelect from "../FrequencySelect";
import ProjectSelect from "../ProjectSelect";

const FilterComponent = ({
  projects,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  frequency,
  setFrequency,
  selectedProjects,
  setSelectedProjects,
}) => {
  const handleRemoveProject = (item) => {
    const filteredProjects = selectedProjects.filter(
      (project) => project != item
    );
    setSelectedProjects(filteredProjects);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={6} sm={4} md={3}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <FrequencySelect frequency={frequency} setFrequency={setFrequency} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ProjectSelect
            projects={projects}
            selectedOptions={selectedProjects}
            setSelectedOptions={setSelectedProjects}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {selectedProjects.map((project) => (
              <Chip
                key={project}
                label={project}
                onDelete={() => handleRemoveProject(project)}
                sx={{
                  borderRadius: "0",
                  height: "36px",
                  backgroundColor: "#545454",
                  color: "#fff",
                }}
                deleteIcon={
                  <ClearIcon
                    style={{
                      color: "#fff",
                    }}
                  />
                }
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterComponent;
