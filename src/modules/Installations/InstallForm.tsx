import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addInstallation } from "../../redux/slices/installationsSlice";
import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";

const InstallForm: React.FC = () => {
  const dispatch = useDispatch();

  const [trainer, setTrainer] = useState("");
  const [trainee, setTrainee] = useState("");
  const [facility, setFacility] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState("");
  const [checklist, setChecklist] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  console.log(completed);

  const allSteps = ["Unboxed", "Plugged In", "Powered On", "Calibrated"];

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleChecklist = (step: string) => {
    setChecklist((prev) =>
      prev.includes(step)
        ? prev.filter((item) => item !== step)
        : [...prev, step]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      addInstallation({
        id: Date.now().toString(),
        trainer,
        trainee,
        facility,
        notes,
        checklist,
        photo,
        completed: checklist.length === allSteps.length,
      })
    );

    // Reset
    setTrainer("");
    setTrainee("");
    setFacility("");
    setNotes("");
    setChecklist([]);
    setPhoto("");
    setCompleted(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Installation & Training Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Facility"
            fullWidth
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Trainer Name"
            fullWidth
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Trainee Name"
            fullWidth
            value={trainee}
            onChange={(e) => setTrainee(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Checklist</Typography>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {allSteps.map((step) => (
              <Grid key={step}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checklist.includes(step)}
                      onChange={() => toggleChecklist(step)}
                    />
                  }
                  label={step}
                />
              </Grid>
            ))}
          </Grid>

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
            Submit Installation
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InstallForm;
