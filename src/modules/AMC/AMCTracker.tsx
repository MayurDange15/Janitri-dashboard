import React from "react";
import AMCForm from "./AMCForm";
import AMCList from "./AMCList";
import { Box } from "@mui/material";

const AMCTracker: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>
      <AMCForm />
      <AMCList />
    </Box>
  );
};

export default AMCTracker;
