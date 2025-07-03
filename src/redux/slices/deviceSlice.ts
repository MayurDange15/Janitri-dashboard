import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Device {
  id: string;
  type: string;
  facility: string;
  status: "Online" | "Offline" | "Maintenance";
  battery: number;
  lastServiceDate: string;
  amcStatus: string;
}

interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: [],
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    // add more actions like editDevice, deleteDevice
  },
});

export const { setDevices, addDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
