import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import CustomButton from "../CustomButton";

const Header = ({ clickImport }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Workers Time Tracker</h3>
      <CustomButton
        variant="contained"
        startIcon={<DownloadIcon />}
        text="Import CSV"
        handleClick={clickImport}
      />
    </Box>
  );
};

export default Header;
