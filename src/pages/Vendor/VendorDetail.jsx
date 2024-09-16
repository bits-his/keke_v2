import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Row, Col} from "reactstrap";
import keke from "../../assets/keke_napep.png";
import { _get, _post, separator } from "../../lib/Helper";
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
import ViewTable from "../Component/ViewTable";

export default function VendorDetail() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});
  const params = useParams();
  const owner_id = params.id;

  const getData = useCallback(() => {
    _get(`vendors?query_type=select&id=${owner_id}`, (resp) => {
      if (resp.success && resp.results) {
        setDetails(resp.results[0]);
      }
    });
  }, [owner_id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getReg = useCallback(() => {
    _post(
      `top-up/history`,
      {
        source_id: owner_id,
        query_type: "select_vendor",
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
    navigate("/vendorReg");
  };
  return (
    <Card className="px-2 rounded-sm min-h-full">
      <div className="flex flex-row justify-center">
        <span className="p-6 pr-0 mr-auto">
          <Button onClick={() => navigate("/vendor")}>Back</Button>
        </span>
        <CardHeader className=" flex-row">
          <CardTitle className="text-center ">Vendor</CardTitle>
          {/* <CardDescription>create new user</CardDescription> */}
        </CardHeader>
      </div>
    
        {/* <Col md={12}>
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
                width: 100,
                padding: 10,
                color: "#fff",
                borderRadius: 10,
              }}
              onClick={handleBackToTable}
            >
              Back
            </Button>

            <h4 className="app_title">Account Detail</h4>

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
        <Col md={12}>
          <section style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{ width: "50%", marginBottom: "20px", display: "flex" }}
              >
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Vendor's name:{" "}
                </p>
                <span>{details?.vendor_name}</span>
              </div>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Phone no.:{" "}
                </p>
                <span>{details?.vendor_org_phone}</span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  Address:{" "}
                </p>
                <span>{details?.vendor_ofiice_address}</span>
              </div>
              <div style={{ width: "50%", display: "flex" }}>
                <p
                  style={{ marginRight: 10, fontSize: 16, fontWeight: "bold" }}
                >
                  E-mail:{" "}
                </p>
                <span>{details?.vendor_org_email}</span>
              </div>
            </div>
          </section>
          <ViewTable data={data} />
        </Col>
      
    </Card>
  );
}
