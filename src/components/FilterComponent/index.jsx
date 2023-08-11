import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import FrequencySelect from "../FrequencySelect";
import ProjectSelect from "../ProjectSelect";

const FilterComponent = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedProjects, setSelectedProjects] = useState([]);

  console.log(selectedProjects);

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
          <FrequencySelect />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ProjectSelect
            selectedOptions={selectedProjects}
            setSelectedOptions={setSelectedProjects}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            {selectedProjects.map((project) => (
              <Chip
                key={project}
                label={project}
                onDelete={() => handleRemoveProject(project)}
                sx={{
                    borderRadius: 'none'
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterComponent;
