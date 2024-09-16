import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Button, Table, Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { _get, _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";

export default function AgentView() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [details, setDetails] = useState({});
  const [superagent, setsuperagent] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  const getReg = useCallback(() => {
    _get(`agents?query_type=select&id=${owner_id}`, (resp) => {
      if (resp.success && resp.results) {
        setDetails(resp.results[0]);
      }
    });
  }, [owner_id]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  const handleBackToTable = () => {
    navigate("/agenttable");
  };

  return (
    <Card className="">
      <Row>
        {/* <Col md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {}

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

            
            <h4 className="app_title">{data.name}</h4>

            
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
        </Col> */}
        <Row className="align-items-start text-left">
          <section style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{ width: "50%", marginBottom: "20px", display: "flex" }}
              >
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Agent's name:{" "}
                </p>
                <span>{details?.name}</span>
              </div>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Phone no.:{" "}
                </p>
                <span>{details?.phone_no}</span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Address:{" "}
                </p>
                <span>{details?.address}</span>
              </div>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  E-mail:{" "}
                </p>
                <span>{details?.email}</span>
              </div>
            </div>
          </section>
        </Row>
      </Row>
    </Card>
  );
}
