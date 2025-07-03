import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setAlerts } from "../../redux/slices/alertSlice";
import type { AlertEntry } from "../../redux/slices/alertSlice";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";

const AlertList: React.FC = () => {
  const alerts = useSelector((state: RootState) => state.alerts.entries);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alerts.length === 0) {
      fetch("/data/alerts.json")
        .then((res) => res.json())
        .then((data: AlertEntry[]) => dispatch(setAlerts(data)))
        .catch((err) => console.error("Error loading alert demo data:", err));
    }
  }, [alerts.length, dispatch]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Alert Logs</Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.id} divider alignItems="flex-start">
            <ListItemText
              primary={`${alert.deviceId} — ${alert.reason}`}
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    Engineer: {alert.engineer}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    Date: {alert.date}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    Notes: {alert.notes}
                  </Typography>
                </>
              }
            />
            {alert.photo && (
              <img
                src={alert.photo}
                alt="alert"
                style={{ width: 100, height: "auto", marginLeft: 16 }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AlertList;
