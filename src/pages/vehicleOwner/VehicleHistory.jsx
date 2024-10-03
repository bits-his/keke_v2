import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {_post} from "../../lib/Helper";
import ViewTable from "../Component/ViewTable";

export default function VehicleHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const params = useParams();
  const owner_id = params.id;

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

  useEffect(() => {
    getReg();
  }, [getReg]);


  return (
    <Card className="px-2 rounded-sm min-h-full">
      <div className="flex flex-row justify-center">
        <span className="px-2 pr-0 mr-auto p-3">
          <Button onClick={() => navigate(-1)}>Back</Button>
        </span>
        <CardHeader className=" flex-row p-3">
          <CardTitle className="text-center ">Vehicle History</CardTitle>
        </CardHeader>
      </div>

      <ViewTable data={data} />
   
    </Card>
  );
}
