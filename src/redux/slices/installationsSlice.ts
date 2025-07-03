import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Installation {
  id: string; // UUID or device id
  facility: string;
  checklist: string[];
  trainer: string;
  trainee: string;
  photo: string; // base64 or file name
  notes: string;
  completed: boolean;
}

interface InstallationState {
  records: Installation[];
}

const initialState: InstallationState = {
  records: [],
};

const installationsSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    addInstallation: (state, action: PayloadAction<Installation>) => {
      state.records.push(action.payload);
    },
  },
});

export const { addInstallation } = installationsSlice.actions;
export default installationsSlice.reducer;
