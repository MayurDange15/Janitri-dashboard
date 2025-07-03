import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlertEntry {
  id: string;
  deviceId: string;
  engineer: string;
  date: string;
  reason: string;
  notes: string;
  photo: string; // base64 image
}

interface AlertState {
  entries: AlertEntry[];
}

const initialState: AlertState = {
  entries: [],
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertEntry>) => {
      state.entries.push(action.payload);
    },
    setAlerts: (state, action: PayloadAction<AlertEntry[]>) => {
      state.entries = action.payload;
    },
  },
});

export const { addAlert, setAlerts } = alertSlice.actions;
export default alertSlice.reducer;
