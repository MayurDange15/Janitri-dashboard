import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import Layout from "./layouts/dashboard";
import InventoryDashboard from "./modules/Inventory/InventoryDashboard";
import InstallForm from "./modules/Installations/InstallForm";
import ServiceLogForm from "./modules/ServiceLogs/ServiceLogForm";
import AMCTracker from "./modules/AMC/AMCTracker";
import AlertTracker from "./modules/Alerts/AlertTracker";

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: InventoryDashboard,
          },
          {
            path: "installation",
            Component: InstallForm,
          },
          {
            path: "service-logs",
            Component: ServiceLogForm,
          },
          {
            path: "AMC-CMC",
            Component: AMCTracker,
          },
          {
            path: "alerts-logs",
            Component: AlertTracker,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
