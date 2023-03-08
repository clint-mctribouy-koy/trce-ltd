import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order — <Link to="/">Go Back Home</Link>
      </Alert>
    </Box>
  );
};

export default Confirmation;
