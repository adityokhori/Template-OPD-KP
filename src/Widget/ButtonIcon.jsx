import React from "react";
import { Button } from "@mui/material";

const ButtonIcon = () => {
  return (
    <Button variant="contained" color="primary" startIcon={<DeleteIcon />}>
      Click Me
    </Button>
  );
};

export default ButtonIcon;
