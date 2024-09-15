import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Card } from "reactstrap";
import { _get } from "../../lib/Helper";

export default function Vehicle() {
  const [] = useState("");

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
      <Outlet />
    </Card>
  );
}
