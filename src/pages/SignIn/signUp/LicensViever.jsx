import { PDFViewer } from "@react-pdf/renderer";
import React, { useCallback, useEffect, useState } from "react";
import { LicensPDF } from "./LicensPDF";
import { useParams } from "react-router-dom";
import { _get } from "../../../lib/Helper";

export default function LicensViever() {
  const [data, setData] = useState([]);
  const vehicle_id = useParams().vehicle_id;

  const getVehicles = useCallback(() => {
    // setLoading(true);
    _get(`vehicles?query_type=pdf&owner_id=${vehicle_id}`, (resp) => {
      if (resp.data && resp.data.length) {
        setData(resp.data);
        // setLoading(false);
      }
    });
  }, [vehicle_id]);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  return (
    <div>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <LicensPDF data={data[0]} />
      </PDFViewer>
    </div>
  );
}
