import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import { Button, ButtonGroup, Card, Col, Row, Badge, Table } from "reactstrap";

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
        const ownerDetail = resp.data.find((item) => item.id == owner_id);
        //console.log(ownerDetail)
        setData(ownerDetail);
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

  //console.log(data)
  // const vehicledata = data.map((item) => {
  //   item.filter((itemId) => itemId === item.id)
  // })

  // console.log(vehicledata)

  return (
    <Card className=" shadow p-4 m-2 mt-2" style={{ padding: 15 }}>
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Back Button */}

            <Button
              className="app_button"
              style={{
                width: 150,
                padding: 10,
                marginLeft: 15,
                color: "#000",
                borderRadius: 10,
              }}
              onClick={handleBackToTable}
            >
              Back
            </Button>

            {/* Title */}
            <h4 className="app_title">{data?.name}</h4>

            {/* User DP */}
            <img
              src={keke}
              alt="User DP"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          </div>
          <hr />
        </Col>
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
                onClick={() => navigate(`/vehicleregistration/${owner_id}`)}
              >
                {" "}
                Add +
              </Button>
            </div>

            <Table striped>
              <thead>
                <tr>
                  <th>Vehicle ID.</th>
                  <th>Plate No.</th>
                  <th>Chasis No.</th>
                  {/* <th>Balance (₦)</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles?.map((vehicle, idx) => (
                  <tr key={idx}>
                    <td>{vehicle.vehicle_id}</td>
                    <td>{vehicle.plate_no}</td>
                    <td>{vehicle.chasis_no}</td>

                    <td className="text-center p-2">
                      <ButtonGroup>
                        {/* <Button
                              onClick={() => {
                                navigate(`${vehicle.vehicle_id}`)
                                setCurrentItem(vehicle);
                                //handlePay(id);
                              }}
                              color="success"
                            >
                              Transactions
                            </Button> */}
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
          </Col>
        </Col>
      </Row>
    </Card>
  );
}
