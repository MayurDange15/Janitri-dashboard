import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  LinearProgress,
} from "@mui/material";

interface DeviceProps {
  id: string;
  type: string;
  facility: string;
  status: "Online" | "Offline" | "Maintenance";
  battery: number;
  lastServiceDate: string;
  amcStatus: string;
}

const statusColor = {
  Online: "success",
  Offline: "error",
  Maintenance: "warning",
} as const;

const DeviceCard: React.FC<DeviceProps> = ({
  id,
  type,
  facility,
  status,
  battery,
  lastServiceDate,
  amcStatus,
}) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid>
            <Typography variant="h6">
              {type} — #{id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Facility: {facility}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Service: {lastServiceDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AMC/CMC: {amcStatus}
            </Typography>
          </Grid>
          <Grid>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip label={status} color={statusColor[status]} />
              <Typography variant="body2" ml={1}>
                Battery: {battery}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={battery}
              color={
                battery > 50 ? "success" : battery > 20 ? "warning" : "error"
              }
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
