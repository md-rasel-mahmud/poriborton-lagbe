import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import useDialog from "../../hooks/useDialog";
import useFormHook from "../../hooks/useFormHook";

const Test = () => {
  const { open, handleDialogOpen, handleDialogClose } = useDialog();
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
  });
  const { handleSubmit, control } = useFormHook({
    validationSchema: schema,
    defaultValues: { name: "", email: "" },
  });

  const formSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Button variant="contained" type="button" onClick={handleDialogOpen}>
        Open dialog
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        component="form"
        onSubmit={handleSubmit(formSubmit)}
        onClose={handleDialogClose}
        open={open}
      >
        <DialogTitle>Test</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      {...field}
                      label="Name"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      {...field}
                      type="email"
                      label="Email"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined" type="cancel">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Test;
