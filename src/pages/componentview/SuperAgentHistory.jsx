import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, } from "reactstrap";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../lib/Helper";
import ViewTable from "../Component/ViewTable";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuperAgentView from "./SuperAgentView";

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
    <Card className="px-2">
      <div className="flex flex-row justify-center">
        <span className="p-6 pr-0 mr-auto">
          <Button onClick={() => navigate("/superagenttable")}>Back</Button>
        </span>
        <CardHeader className=" flex-row">
          <CardTitle className="text-center ">Super Agent History</CardTitle>
          {/* <CardDescription>create new user</CardDescription> */}
        </CardHeader>
      </div>
      <SuperAgentView />
      <Col md={12}>
        <Col md={12}>
          <ViewTable data={data} />
        </Col>
      </Col>
    </Card>
  );
}
