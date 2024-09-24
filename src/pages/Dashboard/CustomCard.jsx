import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { _get } from "../../lib/Helper";

import DashboardCard from "./Card";
import {
  Home,
  // LineChart,
  // Menu,
  // Package,
  // Package2,
  // Search,
  // ShoppingCart,
  // Users,
} from "lucide-react";
import { useSelector } from "react-redux";

const QuickActivityWrap = () => {
  const [data, setData] = useState(false);

  const [superAgentMax, setSuperAgentMax] = useState([]);

  useEffect(() => {
    _get(
      "fetchallcards",
      (response) => {
        if (response.success) setData(response.data[0]);
      },
      (error) => {
        console.error("Error fetching cards counts:", error);
      }
    );
  }, []);
  const user = useSelector((state => state.auth.user ))
  return (
    // <div className="quick_activity_wrap">
    //   {/* {JSON.stringify(data)} */}
    //   <Row>
    //     <Col xs={12} sm={6} lg={3} style={columnMarginBottom}>
    //       <Link to="/vendorReg" style={{ textDecoration: "none" }}>
    //         <Card className="single_quick_activity " style={totalExpensesStyle}>
    //           <CardBody>
    //             <CardTitle>Total No. of vendors</CardTitle>
    //             <h3>
    //               <span>{data ? data.vendors_count : 0}</span>
    //             </h3>
    //             <div style={iconStyle}>
    //               <LiaLayerGroupSolid />
    //             </div>
    //           </CardBody>
    //         </Card>
    //       </Link>
    //     </Col>
    //     <Col xs={12} sm={6} lg={3} style={columnMarginBottom}>
    //       <Link to="/superagenttable" style={{ textDecoration: "none" }}>
    //         <Card className="single_quick_activity " style={totalIncomeStyle}>
    //           <CardBody>
    //             <CardTitle>Total No. of super agent</CardTitle>
    //             <h3>
    //               <span>{data ? data.super_agents_count : 0}</span>
    //             </h3>
    //             <div style={iconStyle}>
    //               <FaUser />
    //             </div>
    //           </CardBody>
    //         </Card>
    //       </Link>
    //     </Col>
    //     <Col xs={12} sm={6} lg={3} style={columnMarginBottom}>
    //       <Link to="/agenttable" style={{ textDecoration: "none" }}>
    //         <Card
    //           className="single_quick_activity "
    //           style={netProfitMarginStyle}
    //         >
    //           <CardBody>
    //             <CardTitle>Total No. of Agents</CardTitle>
    //             <h3>
    //               <span>{data ? data.agents_count : 0}</span>
    //             </h3>
    //             <div style={iconStyle}>
    //               <MdOutlineSupportAgent />
    //             </div>
    //           </CardBody>
    //         </Card>
    //       </Link>
    //     </Col>
    //     <Col xs={12} sm={6} lg={3} style={columnMarginBottom}>
    //       <Link to="/Vehicleownertable" style={{ textDecoration: "none" }}>
    //         <Card className="single_quick_activity " style={cashOnHandStyle}>
    //           <CardBody>
    //             <CardTitle>Total No. of vehicles</CardTitle>
    //             <h3>
    //               <span>{data ? data.vehicles_count : 0}</span>
    //             </h3>
    //             <div style={iconStyle}>
    //               <FaTruckFast />
    //             </div>
    //           </CardBody>
    //         </Card>
    //       </Link>
    //     </Col>
    //   </Row>
    // </div>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
      {user.account_type === "admin" ? (
        <DashboardCard
          title={"Total No. of Vendors"}
          Icon={Home}
          data={data ? data.vendors_count : 0}
          link={"vendors"}
        />
      ) : (
        <></>
      )}
      {user.account_type === "vendor" || user.account_type === "admin" ? (
        <DashboardCard
          title={"Total No. of Super Agent"}
          Icon={Home}
          data={data ? data.super_agents_count : 0}
          link={"superagenttable"}
        />
      ) : (
        <></>
      )}
      {user.account_type === "vendor" ||
      user.account_type === "super_agent" ||
      user.account_type === "admin" ? (
        <DashboardCard
          title={"Total No. of Agents"}
          Icon={Home}
          data={data ? data.agents_count : 0}
          link={"agenttable"}
        />
      ) : (
        <></>
      )}
      {user.account_type === "vehicle_owner" ? (
        <DashboardCard
          title={"My of Vehicles"}
          Icon={Home}
          data={data ? data.vehicles_count : 0}
          link={"vehiclelist"}
        />
      ) : (
        <DashboardCard
          title={"Total No. of Vehicles"}
          Icon={Home}
          data={data ? data.vehicles_count : 0}
          link={"vehicles"}
        />
      )}
    </div>
  );
};

export default QuickActivityWrap;
