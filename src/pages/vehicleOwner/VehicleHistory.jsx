import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Card, Row, Col, Button } from "reactstrap";
import keke from "../../assets/keke_napep.png";
import { _get, _post, separator } from "../../lib/Helper";
import toast from "react-hot-toast";

export default function VehicleHistory() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  //console.log(owner_id)

  const getReg = useCallback(() => {
    _post(
      `top-up/history`,
      {
        source_id: owner_id,
        type_of_top_up: "vehicle_top_up",
        query_type: "select_vehicle",
      },
      (resp) => {
        if (resp.success && resp.results) {
          const dataDetail = resp.results;
          setData(dataDetail);
        }
      }
    );
  }, [owner_id]);
  const dailyTopUp = () => {
    _get("daily_top_up", (resp) => {
      toast.success(resp.message);
      getReg();
    });
  };

  useEffect(() => {
    getReg();
  }, [getReg]);

  const handleBackToTable = () => {
    navigate("/vehicles");
  };
  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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

            <h4 className="app_title">Account History</h4>

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
            <Table striped bordered>
              {/* {JSON.stringify(data)} */}
              <thead>
                <tr className="table-dark">
                  <th scope="row">Date</th>
                  <th scope="row">Type</th>
                  <th scope="row">Description</th>
                  <th scope="row">Credit</th>
                  <th scope="row">Debit</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.t_date}</td>
                      <td>{item.type_of_top_up}</td>
                      <td>{item.description}</td>
                      <td className="text-right">{separator(item.credit)}</td>
                      <td className="text-right">{separator(item.debit)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No transactions have been made.
                    </td>
                  </tr>
                )}
                {/* <tr>
                    <td>
                      {data.t_date}
                    </td>
                    <td>
                      {data.type_of_top_up}
                    </td>
                    <td>
                      {data.description}
                    </td>
                    <td className="text-center">
                      {data.credit}
                    </td>
                    <td className="text-center">
                      {data.balance}
                    </td>
                  </tr> */}
              </tbody>
            </Table>
          </Col>
          <button
            className="btn btn-primary "
            style={{ padding: 20 }}
            onClick={dailyTopUp}
          >
            Daily Top UP
          </button>
        </Col>
      </Row>
    </Card>
  );
}
