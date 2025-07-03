import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceCard from "../../components/DeviceCard";
import { setDevices } from "../../redux/slices/deviceSlice";
import type { RootState } from "../../redux/store";
import { Container, Typography } from "@mui/material";

const InventoryDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices.devices);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('/data/devices.json');
      const data = await res.json();
      dispatch(setDevices(data));
    } catch (err) {
      console.error("Failed to load device data", err);
    }
  };

  fetchData();
}, [dispatch]);


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Device Inventory Dashboard
      </Typography>
      {devices.map((device) => (
        <DeviceCard key={device.id} {...device} />
      ))}
    </Container>
  );
};

export default InventoryDashboard;
