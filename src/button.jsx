import * as React from "react";
import Button from "@mui/material/Button";

export default function Button() {
  return (
    <Button
      variant="contained"
      href="/halo"
      onClick={() => {
        alert("halooo");
      }}
    >
      HALOO
    </Button>
  );
}
