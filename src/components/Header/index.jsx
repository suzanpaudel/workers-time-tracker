import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const Header = ({ clickImport }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <h3>Workers Time Tracker</h3>
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={clickImport}
        sx={{ textTransform: "none" }}
      >
        Import CSV
      </Button>
    </Box>
  );
};

export default Header;
