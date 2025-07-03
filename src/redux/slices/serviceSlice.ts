import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ServiceVisit {
  id: string;
  engineer: string;
  date: string;
  purpose: "Preventive" | "Breakdown";
  notes: string;
  attachment: string; // base64 string or file name
}

interface ServiceState {
  logs: ServiceVisit[];
}

const initialState: ServiceState = {
  logs: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addServiceLog: (state, action: PayloadAction<ServiceVisit>) => {
      state.logs.push(action.payload);
    },
  },
});

export const { addServiceLog } = serviceSlice.actions;
export default serviceSlice.reducer;
