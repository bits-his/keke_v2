import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Row, Col } from "reactstrap";
// import keke from "../../assets/keke_napep.png";
import { _get, _post, separator } from "../../lib/Helper";
import AgentVeiw from "./AgentView";
import ViewTable from "../Component/ViewTable";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentHistory() {
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
        type_of_top_up: "agent_top_up",
        query_type: "select_agent",
      },
      (resp) => {
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
    navigate("/agenttable");
  };
  return (
    <Card className="px-2 rounded-sm min-h-full">
      <div className="flex flex-row justify-center">
        <span className="p-6 pr-0 mr-auto">
          <Button onClick={() => navigate("/agenttable")}>Back</Button>
        </span>
        <CardHeader className=" flex-row">
          <CardTitle className="text-center ">Agent History</CardTitle>
          {/* <CardDescription>create new user</CardDescription> */}
        </CardHeader>
      </div>
      <AgentVeiw />
      <ViewTable data={data} />
    </Card>
  );
}
