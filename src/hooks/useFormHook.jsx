import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useFormHook = ({ validationSchema, defaultValues }) => {
  // DEFAULT VALUE STATE
  const [defaultValuesState, setDefaultValuesState] = useState(defaultValues);

  const { handleSubmit, control, reset, watch, setValue, formState, setError } =
    useForm({
      mode: "all",
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValuesState,
    });

  useEffect(() => {
    setDefaultValuesState(defaultValues);
    reset(defaultValues);
  }, [defaultValuesState]);

  return { handleSubmit, control, reset, watch, setValue, formState, setError };
};

export default useFormHook;
