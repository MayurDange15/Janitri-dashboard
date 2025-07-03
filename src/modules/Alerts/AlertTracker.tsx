import React from "react";
import AlertForm from "./AlertForm";
import AlertList from "./AlertList";
import { Box } from "@mui/material";

const AlertTracker: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>
      <AlertForm />
      <AlertList />
    </Box>
  );
};

export default AlertTracker;
