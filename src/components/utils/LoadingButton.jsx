import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
const LoadingButton = ({ loading, children, ...rest }) => {
  return (
    <Button
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
      disabled={loading}
      {...rest}
    >
      {children} {loading && <CircularProgress size={13} color="inherit" />}
    </Button>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default LoadingButton;
