import { ControlPointOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const InputsFields = ({
  formData,
  column = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 },
  control,
}) => {
  const autocompleteFilter = createFilterOptions();
  const theme = useTheme();

  return formData.reduce((acc, input) => {
    const itemColumn = column || input.column;

    switch (input.type) {
      case "text":
      case "email":
      case "number":
      case "textarea":
        acc.push(
          <Grid
            item
            key={input.id}
            xs={12 / itemColumn.xs}
            sm={12 / itemColumn.sm}
            md={12 / itemColumn.md}
            lg={12 / itemColumn.lg}
            xl={12 / itemColumn.xl}
          >
            <InputLabel
              color="error"
              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
              required={input.required}
              htmlFor={input.id}
            >
              {input.label}
            </InputLabel>
            <Controller
              name={input.name}
              control={control}
              defaultValue={input.defaultValue}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  fullWidth
                  size={input.size || "small"}
                  variant={input.variant || "outlined"}
                  error={!!error?.message}
                  helperText={error?.message}
                  disabled={input.disabled}
                  {...(input.type === "textarea" && {
                    multiline: true,
                    minRows: 5,
                  })}
                  inputProps={{
                    ...(input.type === "number" && {
                      onWheel: (e) => e.currentTarget.blur(),
                    }),
                  }}
                />
              )}
            />
          </Grid>
        );
        break;
      case "multiple-select":
        acc.push(
          <Grid
            item
            key={input.id}
            xs={12 / itemColumn.xs}
            sm={12 / itemColumn.sm}
            md={12 / itemColumn.md}
            lg={12 / itemColumn.lg}
            xl={12 / itemColumn.xl}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <InputLabel
                sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                required={input.required}
              >
                {input.label}
              </InputLabel>

              {input?.addNew && (
                <Tooltip title={`Add New ${input.label}`} placement="top" arrow>
                  <Box
                    sx={{
                      color: input?.disabled
                        ? theme.palette.text.secondary
                        : theme.palette.primary.main,
                      pointerEvents: input?.disabled ? "none" : "auto",
                      paddingLeft: 0.5,
                      cursor: "pointer",
                      "&:hover": { color: theme.palette.primary.dark },
                    }}
                    onClick={() => {
                      input?.addNewClickHandler();
                    }}
                    size="small"
                  >
                    <ControlPointOutlined />
                  </Box>
                </Tooltip>
              )}
            </Stack>
            <Controller
              name={input.name}
              control={control}
              defaultValue={input.defaultValue}
              render={({ field, fieldState: { error } }) => {
                console.log("value", field.value);
                return (
                  <>
                    <Autocomplete
                      {...field}
                      multiple={true}
                      onChange={(event, newValue) => {
                        console.log({ newValue });
                        if (typeof newValue === "string") {
                          field.onChange([...field.value, newValue]);
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input
                          field.onChange([...field.value, newValue.inputValue]);
                        } else {
                          field.onChange(newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = autocompleteFilter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some(
                          (option) => inputValue === option.label
                        );
                        if (inputValue !== "" && !isExisting) {
                          filtered.push({
                            inputValue,
                            label: `Add "${inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id={input.id}
                      options={input.options}
                      disableCloseOnSelect
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.label;
                      }}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {option.label}
                        </Box>
                      )}
                      size={input.size || "small"}
                      freeSolo
                      renderInput={(params) => (
                        <TextField fullWidth {...params} label={input.label} />
                      )}
                    />
                    {!!error?.message && (
                      <FormHelperText error id={input.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );

        break;
      default:
        return null;
    }

    return acc;
  }, []);
};

InputsFields.propTypes = {
  formData: PropTypes.array.isRequired,
  column: PropTypes.object,
  control: PropTypes.object.isRequired,
};

export default InputsFields;
