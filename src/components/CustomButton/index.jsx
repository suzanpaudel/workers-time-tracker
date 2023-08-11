import { Button } from "@mui/material";

const CustomButton = ({ variant, startIcon, endIcon, text, handleClick }) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{ textTransform: "none" }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
