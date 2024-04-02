import { useState } from "react";

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };
  return { open, handleDialogClose, handleDialogOpen };
};

export default useDialog;
