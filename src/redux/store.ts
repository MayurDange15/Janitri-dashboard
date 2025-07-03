import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./slices/deviceSlice";
import installationsReducer from "./slices/installationsSlice";
import serviceReducer from "./slices/serviceSlice";
import amcReducer from "./slices/amcSlice";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    installations: installationsReducer,
    service: serviceReducer,
    amc: amcReducer,
    alerts: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
