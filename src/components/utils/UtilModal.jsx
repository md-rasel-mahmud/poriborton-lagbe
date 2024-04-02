import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import LoadingButton from "./LoadingButton";

const UtilModal = ({
  title,
  openState,
  formSubmit,
  handleSubmit,
  reset,
  handleDialogClose,
  actionText = "Save",
  children,
  isLoading,
  maxWidth = "xs",
}) => {
  return (
    <Dialog
      onSubmit={handleSubmit(formSubmit)}
      component="form"
      fullWidth
      maxWidth={maxWidth}
      onClose={handleDialogClose}
      open={openState}
      id="form-dialog"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        type="button"
        onClick={handleDialogClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {reset && (
          <Button
            type="reset"
            disabled={isLoading}
            variant="outlined"
            onClick={() => reset()}
          >
            Reset
          </Button>
        )}
        <LoadingButton
          loading={isLoading}
          type="submit"
          color="primary"
          variant="contained"
        >
          {actionText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

UtilModal.propTypes = {
  title: PropTypes.string.isRequired,
  openState: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  formSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  actionText: PropTypes.string,
  isLoading: PropTypes.bool,
  maxWidth: PropTypes.string,
};

export default UtilModal;
