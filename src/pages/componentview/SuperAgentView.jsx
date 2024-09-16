import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  Col, Row, Table, Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { _get, _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import SuperAgentHistory from "./SuperAgentHistory";
import ViewTable from "../Component/ViewTable";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuperAgentView() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState([]);
  const [superagent, setsuperagent] = useState([]);
  const params = useParams();
  const owner_id = params.id;
  const getReg = useCallback(() => {
    _get(`superagent?query_type=select&id=${owner_id}`, (resp) => {
      if (resp.success && resp.results) {
        setData(resp.results);
        console.log(resp.results);
      }
    });
  }, [owner_id]);

  useEffect(() => {
    getReg();
  }, [getReg]);
 

  const handleBackToTable = () => {
    navigate("/superagenttable");
  };

  return (
    <>
  
      <Col md={12}>
        <Col md={12}>
          <section style={{ marginBottom: "2rem" }}>
            {/* {JSON.stringify(data)} */}
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%", marginBottom: "20px" }}>
                <p>SuperAgent's Name: </p>
                <span>{data[0]?.name}</span>
              </div>
              <div style={{ width: "50%" }}>
                <p>Phone no. : </p>
                <span>{data[0]?.phone}</span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <p>Address: </p>
                <span>{data[0]?.address}</span>
              </div>
              <div style={{ width: "50%" }}>
                <p>E-mail: </p>
                <span>{data[0]?.email}</span>
              </div>
            </div>
          </section>
 
        </Col>
      </Col>
    </>
  );
}
