import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addAlert } from "../../redux/slices/alertSlice";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  MenuItem,
} from "@mui/material";

const predefinedReasons = [
  "Battery Failure",
  "Display Malfunction",
  "Sensor Error",
  "Connectivity Issue",
  "Other",
];

const AlertForm: React.FC = () => {
  const dispatch = useDispatch();

  const [deviceId, setDeviceId] = useState("");
  const [engineer, setEngineer] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState("");

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      addAlert({
        id: Date.now().toString(),
        deviceId,
        engineer,
        date: new Date().toISOString().split("T")[0],
        reason,
        notes,
        photo,
      })
    );

    // Reset
    setDeviceId("");
    setEngineer("");
    setReason("");
    setNotes("");
    setPhoto("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Report Device Alert
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Device ID"
            fullWidth
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Engineer Name"
            fullWidth
            value={engineer}
            onChange={(e) => setEngineer(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Alert Reason"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ mb: 2 }}
          >
            {predefinedReasons.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload Photo
            <input type="file" hidden onChange={handlePhotoUpload} />
          </Button>

          {photo && (
            <Box sx={{ mb: 2 }}>
              <img src={photo} alt="preview" style={{ maxWidth: "100%" }} />
            </Box>
          )}

          <Button type="submit" variant="contained" fullWidth>
            Submit Alert
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AlertForm;
