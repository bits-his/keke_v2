import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Button, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../../lib/Helper";
import keke from "../../../assets/keke_napep.png";

export default function SuperAgentHistory() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  const getReg = useCallback(() => {
    _post(
      `top-up/history`,
      {
        source_id: owner_id,
        type_of_top_up: "super_agent_top_up",
        query_type: "select_super_agent",
      },
      (resp) => {
        // console.log(resp, "gsgsggsg");
        if (resp.success && resp.results) {
          setData(resp.results);
        }
      }
    );
  }, [owner_id]);

  useEffect(() => {
    getReg();
  }, [getReg]);
  const handleBackToTable = () => {
    navigate("/superagenttable");
  };
  return (
    <Card>
      <Row>
        <Col md={12}>
          <Col md={12}>
            <Table striped bordered>
              <thead>
                <tr className="table-dark">
                  <th scope="row" className="text-center">
                    Date
                  </th>
                  <th scope="row" className="text-center">
                    Type
                  </th>
                  <th scope="row" className="text-center">
                    Description
                  </th>
                  <th scope="row" className="text-center">
                    Credit
                  </th>
                  <th scope="row" className="text-center">
                    Debit
                  </th>
                  <th scope="row" className="text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length ? (
                  data.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item?.t_date}</td>
                      <td>{item?.type_of_top_up}</td>
                      <td>{item?.description}</td>
                      <td className="text-right">{separator(item?.credit)}</td>
                      <td className="text-right">{separator(item?.debit)}</td>
                      <td
                        style={{
                          color: `${
                            item.status === "success" ? "green" : "blue"
                          }`,
                        }}
                      >
                        {item?.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No transactions have been made.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}
