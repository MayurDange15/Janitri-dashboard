import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addServiceLog } from "../../redux/slices/serviceSlice";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

const ServiceLogForm: React.FC = () => {
  const dispatch = useDispatch();

  const [engineer, setEngineer] = useState("");
  const [purpose, setPurpose] = useState<"Preventive" | "Breakdown">(
    "Preventive"
  );
  const [notes, setNotes] = useState("");
  const [attachment, setAttachment] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      addServiceLog({
        id: Date.now().toString(),
        engineer,
        date,
        purpose,
        notes,
        attachment,
      })
    );

    setEngineer("");
    setPurpose("Preventive");
    setNotes("");
    setAttachment("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Service Visit Log
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Engineer Name"
            fullWidth
            value={engineer}
            onChange={(e) => setEngineer(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Purpose</Typography>
          <RadioGroup
            row
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value as "Preventive" | "Breakdown")
            }
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="Preventive"
              control={<Radio />}
              label="Preventive"
            />
            <FormControlLabel
              value="Breakdown"
              control={<Radio />}
              label="Breakdown"
            />
          </RadioGroup>

          <TextField
            label="Visit Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload Attachment
            <input type="file" hidden onChange={handleUpload} />
          </Button>

          {attachment && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Uploaded</Typography>
            </Box>
          )}

          <Button type="submit" variant="contained" fullWidth>
            Submit Service Log
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ServiceLogForm;
