import { useCallback, useEffect, useState } from "react";
// import QRCode from "react-qr-code";

import { _get } from "../../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
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

export default function TopUp() {
  // const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const [fund, setFund] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [userDetail, setUserDetail] = useState({
    Reg_no: "",
    Plate_no: "",
  });
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const [query, setQuery] = useState("select-all");

  const search = () => {
    setQuery("search");
  };

  const goto = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const fund_us = () => {
    setFund(true);
    toggleModal();
  };
  // const agentDetails = {
  //   name: "Ahmad Ibrahim",
  //   id: 123,
  //   bal: 2000,
  // };
  const getReg = useCallback(() => {
    setLoading(true);
    _get(`vehicles?query_type=${query}&engine_no=${filter}`, (resp) => {
      if (resp.success && resp.data) {
        setData(resp.data);
        setLoading(false);
        // console.log(resp);
      }
    });
    // _get(`vendors?query_type=select-all&plate_no=${filter}`, (resp) => {
    //   setLoading(false); // Set loading to false after receiving response
    //   if (resp.success && resp.results) {
    //     setVendorData(resp.results);
    //   }
    // });
  }, [query]);
  useEffect(() => {
    if (!filter) {
      setQuery("select-all");
    }
  }, [filter]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  return (
    <>
      {/* <Card className="app_card dashboard_card shadow m-2 mt-2">
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 className="app_title"> Point of Collection</h4>
            </div>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col md={12}>
            <div className="search-bar-box">
              <div className="search">
                <CiSearch
                  style={{
                    fontSize: 30,
                    width: 25,
                    marginTop: 3,
                    color: "#000",
                  }}
                />
                <input
                  name="filter"
                  value={filter}
                  type="text"
                  className="app_input2"
                  onChange={({ target: { value } }) => setFilter(value)}
                  style={{
                    width: "100%",
                    fontSize: 20,
                  }}
                  placeholder="Search Vehicle Owner"
                />
              </div>
              <label onClick={search} className="label_title">
                Search
              </label>
            </div>
          </Col>
          <div className="table_overflow">
            {loading ? (
              <Spinner
                color="warning"
                className="spinner"
                type="grow"
                style={{ margin: "20px auto" }}
              >
                ""
              </Spinner>
            ) : data?.length === 0 ? (
              <Table
                bordered
                responsive
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "4px",
                }}
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Vehicle {filter} found
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <Table
                bordered
                responsive
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "4px",
                }}
              >
                <thead>
                  <tr>
                    <th>Vehicle ID.</th>
                    <th>Plate No.</th>
                    <th>Chasis No.</th>
                    <th>Balance (₦)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((vehicle, idx) => (
                    <tr key={idx}>
                      <td>{vehicle.vehicle_id}</td>
                      <td>{vehicle.plate_no}</td>
                      <td>{vehicle.chasis_no}</td>
                      <td className="text-right">
                        {parseFloat(vehicle.balance).toFixed(2)}
                      </td>
                      <td className="text-center p-2">
                        <ButtonGroup>
                          <Button
                            onClick={() => {
                              navigate(`${vehicle.vehicle_id}`);
                              setCurrentItem(vehicle);
                              //handlePay(id);
                            }}
                            color="success"
                          >
                            Transactions
                          </Button>
                          <Button
                            color="info"
                            onClick={() => {
                              navigate(`/licens-pdf/${vehicle.vehicle_id}`);
                            }}
                          >
                            View License
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>

         
        </Row>
      </Card> */}

      <Card className="px-2 rounded-sm min-h-full">
        <CardHeader className="px-2 py-4 flex justify-between flex-row align-center item-center">
          <CardTitle> Point Of Collection</CardTitle>
          {/* <Button onClick={() => navigate(`${addLink}`)}></Button> */}
        </CardHeader>
        <Table className="p-2">
          <TableCaption className="pb-3">
            A list of your All Vehicles.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Vehicle ID</TableHead>
              <TableHead>Chasis No</TableHead>
              <TableHead className="hidden md:table-cell">Plate No</TableHead>
              <TableHead className="">Vehicle Make</TableHead>
              <TableHead className="hidden md:table-cell">Balance</TableHead>
              {/* <TableHead className="">Status</TableHead> */}
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((vehicle) => (
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
                {/* <TableCell className="">
                  <Badge variant="outline"> {vehicle.status}</Badge>
                </TableCell> */}
                <TableCell className="">
                  <Button>Edit</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </>
  );
}
