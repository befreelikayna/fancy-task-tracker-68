import { HomeIcon, TruckIcon, Database } from "lucide-react";
import Index from "./pages/Index.jsx";
import TodaysDeliveries from "./pages/TodaysDeliveries.jsx";
import MasterTracker from "./pages/MasterTracker.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Today's Deliveries",
    to: "/deliveries",
    icon: <TruckIcon className="h-4 w-4" />,
    page: <TodaysDeliveries />,
  },
  {
    title: "Master Tracker",
    to: "/master-tracker",
    icon: <Database className="h-4 w-4" />,
    page: <MasterTracker />,
  },
];