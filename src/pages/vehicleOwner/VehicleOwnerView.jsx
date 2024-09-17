import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import {  ButtonGroup, Col, Row,} from "reactstrap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VehicleOwnerView() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [vehicleCount, setVehicleCount] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  // console.log(owner_id)
  const getReg = useCallback(() => {
    _get(`vehicle-owners?query_type=select-all&user_id=${owner_id}`, (resp) => {
      //console.log(resp)
      if (resp.success && resp.data) {
        const ownerDetail = resp.data.filter((item) => item.account_id === owner_id);
        //console.log(ownerDetail)
        setData(ownerDetail[0]);
      }
    });

    _get(`vehicles?query_type=select&owner_id=${owner_id}`, (resp) => {
      if (resp.success && resp.data) {
        setVehicles(resp.data);
        // console.log(resp.data)
        setVehicleCount(resp.data[0].vehicle_count);
      }
    });
 
    // })
  }, [owner_id]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  const handleBackToTable = () => {
    navigate("/Vehicleownertable");
  };

  console.log(data)
  // const vehicledata = data.map((item) => {
  //   item.filter((itemId) => itemId === item.id)
  // })

  // console.log(vehicledata)

  return (
    <Card className="px-2 rounded-sm min-h-full">
      <Row>
        <div className="flex flex-row justify-center">
          <span className="p-3 px-2 mr-auto">
            <Button onClick={() => navigate("/vehicleowners")}>Back</Button>
          </span>
          <CardHeader className=" flex-row">
            <CardTitle className="text-center ">Vehicle Owner View</CardTitle>
          </CardHeader>
        </div>
        <Col md={12}>
          <Col md={12}>
            <div className="vehicleview">
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "600", marginRight: "20px" }}>
                  Owner's Name:
                </span>
                <p>{data?.name}</p>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "600", marginRight: "20px" }}>
                  Phone Number
                </span>
                <p>{data?.phone}</p>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "600", marginRight: "20px" }}>
                  Address
                </span>
                <p>{data?.address}</p>
              </div>
              {/* <div style={{display: "flex"}}>
                  <span style={{fontWeight: '600', marginRight: '20px'}}>Registered Vehicle</span>
                  <p>245678rty</p>
                </div> */}
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "600", marginRight: "20px" }}>
                  Local Government Area
                </span>
                <p>{data?.lga}</p>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "600", marginRight: "20px" }}>
                  Number of vehicle
                </span>
                <p>{vehicles.length}</p>
              </div>
            </div>
            <div>
              <Badge color="primary">{vehicleCount}</Badge>{" "}
              <Button
                className="btn btn-primary"
                onClick={() => navigate(`/vehicleowners/vehicleregistration/${owner_id}`)}
              >
                {" "}
                Add +
              </Button>
            </div>
            <Table className="p-2">
              <TableCaption className="pb-3">
                A list of your All Vehicles.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w">Vehicle ID</TableHead>
                  <TableHead>Chasis No</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Plate No
                  </TableHead>
                  <TableHead className="">Vehicle Make</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Balance
                  </TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.vehicle_id}
                    </TableCell>
                    <TableCell>{vehicle.chasis_no}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle.plate_no}
                    </TableCell>
                    <TableCell className="">{vehicle.vehicle_make}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle.balance}
                    </TableCell>
                    <TableCell className="">
                  <Badge variant="outline"> {vehicle.status}</Badge>
                </TableCell>
                    <TableCell className="">
                      <Button
                        onClick={() => {
                          navigate(`/licens-pdf/${vehicle.vehicle_id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/vehicleowners/licens-pdf/${vehicle.vehicle_id}`);
                        }}
                        className="ml-2"
                      >
                        View License
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}
