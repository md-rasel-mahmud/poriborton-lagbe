import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Typography variant="h1">Hello world</Typography>
      <Outlet />
    </>
  );
};

export default App;
