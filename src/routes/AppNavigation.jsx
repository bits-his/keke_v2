
import { useRoutes } from "react-router-dom";
import AppIndex from "./AppIndex";
// import Registration from "../pages/Registration";
// // import RegistrationTable from "../pages/RegistrationTable";
import Vendor from "../pages/Vendor/Vendor";
import Login from "../pages/SignIn/Login";
// import VehicleOwner from "../pages/vehicleOwner/VehicleOwner";
// import VehicleReg from "../pages/vehicleReg/VehicleReg";
import SuperAgent from "../pages/SuperAgent/SuperAgent";
// import SuperAgentTable from "../pages/SuperAgent/SuperAgentTable";
// import SuperAgentTopUp from "../pages/SuperAgent/SuperAgentTopUp";
import Agent from "../pages/SuperAgent/Agent";
// import AgentTable from "../pages/SuperAgent/AgentTable";
// import AgentTopUp from "../pages/SuperAgent/AgentTopUp";
// import VendorTable from "../pages/Vendor/VendorTable";
// import VendorReg from "../pages/Vendor/VendorReg";
// import VehicleOwnerTable from "../pages/vehicleOwner/VehicleOwnerTable";
// import TopUp from "../pages/SignIn/signUp/CollectionPoint";
import Dashboard from "../pages/Dashboard/index";
// import VendorTopUp from "../pages/Vendor/VendorTopUp";
// import VehicleView from "../pages/vehicleOwner/VehicleView";
// import Vehicle from "../pages/vehicleOwner/Vehicle";
// import VehicleTopUp from "../pages/vehicleOwner/VehicleTopUp";
// import LicensViever from "../pages/SignIn/signUp/LicensViever";
// import VehicleOwnerView from "../pages/vehicleOwner/VehicleOwnerView";
// import AgentView from "../pages/SuperAgent/componentview/AgentView";
// import SuperAgentView from "../pages/SuperAgent/componentview/SuperAgentView";
// import VendorView from "../pages/SuperAgent/componentview/VendorView";
// import VendorDetail from "../pages/Vendor/VendorDetail";
// import SuperAgentHistory from "../pages/SuperAgent/componentview/SuperAgentHistory";
// import AgentHistory from "../pages/SuperAgent/componentview/AgentHistory";
// import VehicleHistory from "../pages/vehicleOwner/VehicleHistory";
import ReportStolen from "../pages/ReportStolen/ReportStolen";
// import UserList from "../pages/user-admin/UserList";
// import NewUsers from "../pages/user-admin/NewUsers";
// // import CollectionPointData from "../pages/SignIn/CollectionPointData";
// import VendorSetup from "../pages/Vendor/VendorSetup";
// import SuperAgentSetup from "../pages/SuperAgent/SuperAgentSetup";
// import AgentSetup from "../pages/SuperAgent/AgentSetup";

export default function AppNavigation() {
  let Pages = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: '/top-up/funding',
    //   element: <Funding />
    // },
    {
      element: <AppIndex />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        // {
        //   path: "registration",
        //   element: <Registration />,
        // },
        {
          path: "superagent",
          element: <SuperAgent />,
        },
        {
          path: "agent",
          element: <Agent />,
        },
        // {
        //   path: "superagenttable",
        //   element: <SuperAgentTable />,
        // },
        // {
        //   path: "superagenttable/view/:id",
        //   element: <SuperAgentView />,
        // },
        // {
        //   path: "superagenthistory/history/:id",
        //   element: <SuperAgentHistory />,
        // },
        // {
        //   path: "agenttable",
        //   element: <AgentTable />,
        // },
        // {
        //   path: "agenttable/view/:id",
        //   element: <AgentView />,
        // },
        // {
        //   path: "vendorReg/view/:id",
        //   element: <VendorDetail />,
        // },
        // {
        //   path: "agenthistory/history/:id",
        //   element: <AgentHistory />,
        // },
        // {
        //   path: "/agenttopup",
        //   element: <AgentTopUp />,
        // },

        // {
        //   path: "/vendorsetup",
        //   element: <VendorSetup />,
        // },
        // {
        //   path: "/superagentsetup",
        //   element: <SuperAgentSetup />,
        // },
        // {
        //   path: "/agentsetup",
        //   element: <AgentSetup />,
        // },

        {
          path: "vendor",
          element: <Vendor />,
        },
        {
          path: "report_stolen",
          element: <ReportStolen />,
        },
        // {
        //   path: "vendorReg/",
        //   element: <VendorTable />,
        //   children: [
        //     {
        //       path: "",
        //       element: <VendorReg />,
        //     },
        //   ],
        // },
        // {
        //   path: "vendorReg/view/:id",
        //   element: <VendorView />,
        // },
        // {
        //   path: "vendorReg/detail/:id",
        //   element: <VendorDetail />,
        // },
        // {
        //   path: "/vehicleOwner",
        //   element: <VehicleOwner />,
        // },
        // {
        //   path: "vehicleownertable",
        //   element: <Vehicle />,
        //   children: [
        //     {
        //       path: "",
        //       element: <VehicleOwnerTable />,
        //     },
        //     {
        //       path: ":id",
        //       element: <VehicleView />,
        //     },
        //     {
        //       path: "view/:id",
        //       element: <VehicleOwnerView />,
        //     },
        //   ],
        // },
        // {
        //   path: "vehicleregistration/:id",
        //   element: <VehicleReg />,
        // },
        // {
        //   path: "vehicles",
        //   children: [
        //     {
        //       path: "",
        //       element: <TopUp />,
        //     },
        //     {
        //       path: ":id",
        //       element: <VehicleHistory />,
        //     },
        //   ],
        // },
        // {
        //   path: "/superagenttopup",
        //   element: <SuperAgentTopUp />,
        // },
        // {
        //   path: "/licens-pdf/:vehicle_id",
        //   element: <LicensViever />,
        // },
        // {
        //   path: "/vendortopup",
        //   element: <VendorTopUp />,
        // },
        // {
        //   path: "/vehicletopup",
        //   element: <VehicleTopUp />,
        // },
        // {
        //   path: "/user-admin",
        //   element: <UserList />,
        // },
        // {
        //   path: "user-admin-new",
        //   element: <NewUsers />,
        // },
        // {
        //   path: "collection-point",
        //   // element: <CollectionPointData />,
        // },
      ],
    },
  ]);
  return Pages;
}
