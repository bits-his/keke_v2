import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Button, Table, Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { _get, _post } from "../../../lib/Helper";
import keke from "../../../assets/keke_napep.png";

export default function VendorView() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState({});
  const [superagent, setsuperagent] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  const getReg = useCallback(() => {
    _get(`vendors?query_type=select&id=${owner_id}`, (resp) => {
      if (resp.success && resp.results) {
        setData(resp.results[0]);
      }
    });
  }, [owner_id]);

  useEffect(() => {
    getReg();
  }, [getReg]);

  const handleBackToTable = () => {
    navigate("/vendorReg");
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
            <h4 className="app_title">{data.vendor_name}</h4>

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
            <Table striped>
              <tbody>
                <tr>
                  <th width="20%">Owner's Name</th>
                  <td>{data.vendor_name}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{data.vendor_org_phone}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{data.vendor_ofiice_address}</td>
                </tr>
                <tr>
                  <th>Vendor's Email</th>
                  <td>{data.vendor_org_email}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{data.vendor_state}</td>
                </tr>
                <tr>
                  <th>TIN</th>
                  <td>{data.vendor_tin}</td>
                </tr>
                <tr>
                  <th>Local Government Area</th>
                  <td>{data.vendor_lga}</td>
                </tr>
                <tr>
                  <th>Registered SuperAgent</th>
                  <td className="text-center">
                    <Badge color="primary">{data.super_agents_count}</Badge>{" "}
                    <Button
                      className="btn btn-primary"
                      onClick={() => navigate(`/superagent`)}
                    >
                      {" "}
                      Add SuperAgent
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}
