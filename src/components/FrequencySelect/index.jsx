import React, { useState } from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FrequencySelect = ({ frequency, setFrequency }) => {
  const frequencies = ["Weekly", "Bi-weekly", "Monthly", "Bi-Monthly"];
  const [isOpen, setIsOpen] = useState(false);

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const toggleMenuOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        value={frequency}
        onChange={handleFrequencyChange}
        onOpen={toggleMenuOpen}
        onClose={toggleMenuOpen}
        displayEmpty
        IconComponent={() =>
          isOpen ? (
            <KeyboardArrowUpIcon sx={{ marginRight: "0.5rem" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ marginRight: "0.5rem" }} />
          )
        }
      >
        <MenuItem disabled value="">
          Report Frequency
        </MenuItem>
        {frequencies.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FrequencySelect;
