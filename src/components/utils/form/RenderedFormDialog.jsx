import { Button } from "@mui/material";
import useDialog from "../../../hooks/useDialog";
import FormComponent from "./FormComponent";
import useFormHook from "../../../hooks/useFormHook";
import * as yup from "yup";

const RenderedFormDialog = () => {
  const { open, handleDialogClose, handleDialogOpen } = useDialog();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
  });

  const { control, reset, handleSubmit } = useFormHook({
    validationSchema,
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const formData = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Email",
    },
    {
      id: "multiple-select",
      name: "multipleSelect",
      label: "Multiple Select",
      type: "multiple-select",
      required: true,
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
      ],
    },
  ];

  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={handleDialogOpen} variant="contained">
        Open
      </Button>
      <FormComponent
        {...{
          title: "Form Dialog",
          formType: "dialog",
          openState: open,
          handleDialogClose,
          handleDialogOpen,
          isLoading: false,
          reset,
          formData,
          control,
          handleSubmit,
          formSubmit,
        }}
      />
    </>
  );
};

export default RenderedFormDialog;
