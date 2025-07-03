import React, { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addContract } from "../../redux/slices/amcSlice";
import {
  Container,
  Paper,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";

const AMCForm: React.FC = () => {
  const dispatch = useDispatch();

  const [deviceId, setDeviceId] = useState("");
  const [contractType, setContractType] = useState<"AMC" | "CMC">("AMC");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vendor, setVendor] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      addContract({
        id: Date.now().toString(),
        deviceId,
        contractType,
        startDate,
        endDate,
        vendor,
      })
    );

    // Reset
    setDeviceId("");
    setContractType("AMC");
    setStartDate("");
    setEndDate("");
    setVendor("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add AMC/CMC Contract
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Device ID"
            fullWidth
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Contract Type</Typography>
          <RadioGroup
            row
            value={contractType}
            onChange={(e) => setContractType(e.target.value as "AMC" | "CMC")}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="AMC" control={<Radio />} label="AMC" />
            <FormControlLabel value="CMC" control={<Radio />} label="CMC" />
          </RadioGroup>

          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Vendor"
            fullWidth
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Save Contract
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AMCForm;
