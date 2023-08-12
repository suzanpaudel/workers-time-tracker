import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ProjectSelect = ({ selectedOptions, setSelectedOptions, projects }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => () => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        disableRipple
        size="large"
        sx={{
          width: "100%",
          textTransform: "none",
          fontSize: "1rem",
          padding: "14px",
          color: "rgba(0, 0, 0, 0.87)",
          borderColor: "rgba(0, 0, 0, 0.23)",
          fontWeight: 400,
          justifyContent: "start",
        }}
        startIcon={<FilterAltIcon />}
      >
        Projects {selectedOptions.length ? `(${selectedOptions.length})` : null}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {projects.length > 0 &&
          projects.map((option) => (
            <MenuItem
              key={option}
              onClick={handleOptionClick(option)}
              style={{ width: "100%" }}
            >
              {option}
            </MenuItem>
          ))}
        {projects.length === 0 && (
          <MenuItem disabled>Import CSV first</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ProjectSelect;
