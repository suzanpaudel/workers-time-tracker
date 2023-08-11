import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const frequencies = ["Weekly", "Bi-weekly", "Monthly", "Bi-Monthly"];

const FrequencySelect = () => {
  const [frequency, setFrequency] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <FormControl sx={{ minWidth: "100%" }}>
      <Select
        value={frequency}
        onChange={handleFrequencyChange}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
        displayEmpty
        IconComponent={() =>
          isOpen ? (
            <KeyboardArrowUpIcon sx={{ marginRight: "0.5rem" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ marginRight: "0.5rem" }} />
          )
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
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
