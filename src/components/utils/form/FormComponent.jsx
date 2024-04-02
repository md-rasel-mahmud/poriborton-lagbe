import PropTypes from "prop-types";
import UtilModal from "../UtilModal";
import { Grid } from "@mui/material";
import InputsFields from "./InputsFields";

const FormComponent = ({ formType, formData, control, column, ...rest }) => {
  if (formType === "dialog") {
    return (
      <UtilModal {...rest}>
        <Grid container spacing={2}>
          <InputsFields {...{ formData, control, column }} />
        </Grid>
      </UtilModal>
    );
  }
};

FormComponent.propTypes = {
  title: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  openState: PropTypes.bool.isRequired,
  handleDialogOpen: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,
  column: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
};

export default FormComponent;
