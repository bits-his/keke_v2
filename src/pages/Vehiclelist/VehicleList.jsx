import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import { ButtonGroup, Col, Row } from "reactstrap";
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

export default function VehicleList() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [vehicleCount, setVehicleCount] = useState([]);

  const getReg = useCallback(() => {
    _get(
      `vehicle-owners?query_type=select-all&user_id=${user.account_id}`,
      (resp) => {
        //console.log(resp)
        if (resp.success && resp.data) {
          const ownerDetail = resp.data.filter(
            (item) => item.account_id === `${user.account_id}`
          );
          //console.log(ownerDetail)
          setData(ownerDetail[0]);
        }
      }
    );

    _get(`vehicles?query_type=select&owner_id=${user.account_id}`, (resp) => {
      if (resp.success && resp.data) {
        setVehicles(resp.data);
        // console.log(resp.data)
        setVehicleCount(resp.data[0].vehicle_count);
      }
    });

    // })
  }, [user.account_id]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  console.log(data);

  return (
    <Card className="px-2 rounded-sm min-h-full">
      {/* {JSON.stringify(user)} */}
      <Row>
        <CardHeader className="px-2 py-4 flex justify-between flex-row align-center item-center">
          <CardTitle>Vehicles List</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => navigate(`topup`)}>Top-Up Vehicle</Button>
            <Button
              onClick={() => navigate(`vehicleregistration/${user.account_id}`)}
            >
              Add Vehicle
            </Button>
          </div>
        </CardHeader>
        <Col md={12}>
          <Col md={12}>
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
                          navigate(
                            `/vehicleslist/licens-pdf/${vehicle.vehicle_id}`
                          );
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
