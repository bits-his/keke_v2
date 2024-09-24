import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import AppIndex from "./AppIndex";
// import Registration from "../pages/Registration";
// import RegistrationTable from "../pages/RegistrationTable";
import Vendor from "../pages/Vendor/Vendor";
import Login from "../pages/SignIn/Login";
import VehicleOwner from "../pages/vehicleOwner/VehicleOwner";
import VehicleReg from "../pages/vehicleReg/VehicleReg";
import RouteOutlet from "../pages/Component/RouteOutlet";
import SuperAgentTable from "../pages/SuperAgent/SuperAgentTable";
import AgentTable from "../pages/AgentTable";
import SuperAgentForm from "../pages/SuperAgent/SuperAgentForm";
// import SuperAgentTable from "../pages/SuperAgent/SuperAgentTable";
import SuperAgentTopUp from "../pages/SuperAgent/SuperAgentTopUp";
import AgentTopUp from "../pages/Agents/AgentTopUp";
import VendorTopUp from "../pages/Vendor/VendorTopUp";
import Agent from "../pages/Agents/Agent";
import VendorReg from "../pages/Vendor/VendorReg";
import VehicleOwnerTable from "../pages/vehicleOwner/VehicleOwnerTable";
import TopUp from "../pages/SignIn/signUp/CollectionPoint";
import Dashboard from "../pages/Dashboard/index";
import Vehicle from "../pages/vehicleOwner/Vehicle";
// import VehicleView from "../pages/vehicleOwner/VehicleView";
import VehicleTopUp from "../pages/vehicleOwner/VehicleTopUp";
import LicensViever from "../pages/SignIn/signUp/LicensViever";
import VehicleOwnerView from "../pages/vehicleOwner/VehicleOwnerView";
// import AgentView from "../pages/componentview/AgentView";
import SuperAgentView from "../pages/componentview/SuperAgentView";
// import VendorView from "../pages/componentview/VendorView";
import VendorDetail from "../pages/Vendor/VendorDetail";
// import SuperAgentHistory from "../pages/SuperAgent/componentview/SuperAgentHistory";
import AgentHistory from "../pages/componentview/AgentHistory";
import VehicleHistory from "../pages/vehicleOwner/VehicleHistory";
import UserList from "../pages/user-admin/UserList";
import NewUsers from "../pages/user-admin/NewUsers";
import ReportStolen from "../pages/ReportStolen/ReportStolen";
import SuperAgentHistory from "../pages/componentview/SuperAgentHistory";
// import CollectionPointData from "../pages/SignIn/CollectionPointData";
import VendorSetup from "../pages/Vendor/VendorSetup";
import SuperAgentSetup from "../pages/SuperAgent/SuperAgentSetup";
import AgentSetup from "../pages/Agents/AgentSetup";
import NotFound from "../../NotFound";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import SuperAgentTopUp_v2 from "../pages/SuperAgent/SuperAgentTopup2";
import { init } from "../redux/actions/auth";
import { useCallback, useEffect } from "react";
import VehicleList from "../pages/Vehiclelist/VehicleList";
import AgentTopUp_v2 from "../pages/Agents/AgentTopUp2";
import VehicleTopUp_v2 from "../pages/vehicleOwner/VehicleTopUp2";

export default function AppNavigation() {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  let Pages = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <AppIndex />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        // {
        //   path: "registration",
        //   element: <Registration />,
        // },
        {
          path: "vendors",
          element: <RouteOutlet />,
          children: [
            {
              path: "",
              element: <VendorReg />,
            },
            {
              path: "addvendor",
              element: <Vendor />,
            },
            {
              path: "topup",
              element: <VendorTopUp />,
            },
            {
              path: "view/:id",
              element: <VendorDetail />,
            },
            {
              path: "setup",
              element: <VendorSetup />,
            },
          ],
        },
        {
          path: "superagenttable",
          element: <RouteOutlet />,
          children: [
            {
              path: "",
              element: <SuperAgentTable />,
            },
            {
              path: "addsuperagent",
              element: <SuperAgentForm />,
            },
            {
              path: "topup",
              element: <SuperAgentTopUp_v2 />,
            },
            {
              path: "view/:id",
              element: <SuperAgentHistory />,
            },
            {
              path: "setup",
              element: <SuperAgentSetup />,
            },
          ],
        },

        // {
        //   path: "superagenttable",
        //   element: <SuperAgentTable />,
        // },

        // {
        //   path: "superagenthistory/history/:id",
        //   element: <SuperAgentHistory />,
        // },
        {
          path: "agenttable",
          element: <RouteOutlet />,
          children: [
            {
              path: "",
              element: <AgentTable />,
            },
            {
              path: "addagent",
              element: <Agent />,
            },
            {
              path: "topup",
              element: <AgentTopUp_v2 />,
            },
            {
              path: "view/:id",
              element: <AgentHistory />,
            },
            {
              path: "setup",
              element: <AgentSetup />,
            },
          ],
        },
        {
          path: "vehicleowners",
          element: <Vehicle />,
          children: [
            {
              path: "",
              element: <VehicleOwnerTable />,
            },
            {
              path: "newOwner",
              element: <VehicleOwner />,
            },
            {
              path: "vehicleregistration/:id",
              element: <VehicleReg />,
            },
            {
              path: "topup",
              element: <VehicleTopUp />,
            },
            // {
            //   path: ":id",
            //   element: <VehicleView />,
            // },
            {
              path: "view/:id",
              element: <VehicleOwnerView />,
            },
            {
              path: "licens-pdf/:vehicle_id",
              element: <LicensViever />,
            },
          ],
        },
        {
          path: "vehicleslist",
          element: <Vehicle />,
          children: [
            {
              path: "",
              element: <VehicleList />,
            },
            {
              path: "topup",
              element: <VehicleTopUp_v2 />,
            },
            {
              path: "vehicleregistration/:id",
              element: <VehicleReg />,
            },
            {
              path: "licens-pdf/:vehicle_id",
              element: <LicensViever />,
            },
          ],
        },

        // {
        //   path: "agenttable/view/:id",
        //   element: <AgentView />,
        // },

        {
          path: "report_stolen",
          element: <ReportStolen />,
        },
        // {
        //   path: "vendorReg/detail/:id",
        //   element: <VendorDetail />,
        // },
        // {
        //   path: "/vehicleOwner",
        //   element: <VehicleOwner />,
        // },

        {
          path: "vehicleregistration/:id",
          element: <VehicleReg />,
        },
        {
          path: "vehicles",
          children: [
            {
              path: "",
              element: <TopUp />,
            },

            {
              path: "view/:id",
              element: <VehicleHistory />,
            },
            {
              path: "licens-pdf/:vehicle_id",
              element: <LicensViever />,
            },
          ],
        },

        {
          path: "user-admin",
          element: <UserList />,
        },
        {
          path: "user-admin/new",
          element: <NewUsers />,
        },
        // {
        //   path: "collection-point",
        //   element: <CollectionPointData />,
        // },
      ],
    },
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return Pages;
}
