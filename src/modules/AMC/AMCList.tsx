import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setContracts } from "../../redux/slices/amcSlice";
import type { AMCContract } from "../../redux/slices/amcSlice";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { CSVLink } from "react-csv";

const AMCList: React.FC = () => {
  const contracts = useSelector((state: RootState) => state.amc.contracts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contracts.length === 0) {
      fetch("/data/amc.json")
        .then((res) => res.json())
        .then((data: AMCContract[]) => {
          dispatch(setContracts(data));
        })
        .catch((err) => console.error("Error loading AMC demo data:", err));
    }
  }, [contracts.length, dispatch]);

  const isExpiringSoon = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diff = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return diff <= 30;
  };

  const csvHeaders = [
    { label: "Contract ID", key: "id" },
    { label: "Device ID", key: "deviceId" },
    { label: "Contract Type", key: "contractType" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Vendor", key: "vendor" },
  ];

  return (
    <>
      <CSVLink
        data={contracts}
        headers={csvHeaders}
        filename="amc_contracts_report.csv"
        style={{
          textDecoration: "none",
          marginBottom: "1rem",
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button variant="outlined" size="small">
            Export Contracts to CSV
          </Button>
        </Box>
      </CSVLink>

      <List sx={{ mt: 4 }}>
        <Typography variant="h6">All AMC/CMC Contracts</Typography>
        {contracts.map((c) => (
          <ListItem key={c.id} divider>
            <ListItemText
              primary={`${c.deviceId} — ${c.contractType}`}
              secondary={`Vendor: ${c.vendor} | Ends: ${c.endDate}`}
            />
            {isExpiringSoon(c.endDate) && (
              <Chip label="Expiring Soon" color="warning" />
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AMCList;
