import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import type { Navigation } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WarningIcon from "@mui/icons-material/Warning";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Core Modules",
  },
  {
    title: "Inventory Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "installation",
    title: "Installation Form",
    icon: <InstallDesktopIcon />,
  },
  {
    segment: "service-logs",
    title: "Service Logs",
    icon: <MiscellaneousServicesIcon />,
  },
  {
    segment: "AMC-CMC",
    title: "AMC/CMC Tracker",
    icon: <EngineeringIcon />,
  },
  {
    segment: "alerts-logs",
    title: "Alerts and Photos",
    icon: <WarningIcon />,
  },
];

const BRANDING = {
  title: "Janitri",
  logo: (
    <img
      src="https://cdn.prod.website-files.com/637a0e4c359e1d804d8ec5b7/63c6fa9f2c153420a9441070_janitri-favicon-1.png"
      alt="Janitri logo"
    />
  ),
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
