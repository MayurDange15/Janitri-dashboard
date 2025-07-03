import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AMCContract {
  id: string;
  deviceId: string;
  contractType: "AMC" | "CMC";
  startDate: string;
  endDate: string;
  vendor: string;
}

interface AMCState {
  contracts: AMCContract[];
}

const initialState: AMCState = {
  contracts: [],
};

const amcSlice = createSlice({
  name: "amc",
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<AMCContract>) => {
      state.contracts.push(action.payload);
    },
    setContracts: (state, action: PayloadAction<AMCContract[]>) => {
      state.contracts = action.payload;
    },
  },
});

export const { addContract, setContracts } = amcSlice.actions;
export default amcSlice.reducer;
