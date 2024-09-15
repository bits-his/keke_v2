import {
  Bell,
  Home,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

export const sidebarModules = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: Home,
  },
  {
    title: "Vendors",
    route: "/vendorReg",
    icon: Package,
    subMenu: [
      {
        label: "Vendors Top Up",
        path: "/vendortopup",
      },
      {
        label: "Vendors Setup",
        path: "/vendorsetup",
      },
    ],
  },
  {
    title: "Super Agents",
    route: "/superagenttable",
    icon: Menu,
    subMenu: [
      {
        label: "Super Agents Top Up",
        path: "/superagenttopup",
      },
      {
        label: "Super Agents Setup",
        path: "/superagentsetup",
      },
    ],
  },
  {
    title: "Agents",
    route: "/agenttable",
    icon: Menu,
    subMenu: [
      {
        label: "Agents Top Up",
        path: "/agenttopup",
      },
      {
        label: "Agents Setup",
        path: "/agentsetup",
      },
    ],
  },
  {
    title: "Vehicles",
    route: "/vehicleownertable",
    icon: Package2,
    subMenu: [
      {
        label: "Vehicles Top Up",
        path: "/vehicletopup",
      },
    ],
  },
  {
    title: "Collection Point",
    route: "/vehicles",
    icon: Bell,
  },
  {
    title: "Collection Point Data",
    route: "/collection-point",
    icon: Search,
  },
  {
    title: "Report Stolen",
    route: "/report_stolen",
    icon: ShoppingCart,
  },
  {
    title: "Admin",
    route: "/user-admin",
    icon: Users,
  },
];
