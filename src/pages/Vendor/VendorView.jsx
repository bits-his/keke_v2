import React, { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Input, Label, Table } from "reactstrap";
import useQuery, { _get } from "../../lib/Helper";

export default function VehicleView() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const params = useParams();
  const query = useQuery();
  const getReg = useCallback(() => {
    const [loading, setLoading] = useState(false);

    setLoading(true);
    _get(`vendor?query_type=select&plate_no=${filter}`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        setData(resp.results);
      }
    });
  }, [filter]);
  let id = params.id;
  useEffect(() => {
    _get(`vendor?query_type=select-all&plate_no=${id}`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        setData(resp.results);
      }
    });
  }, [id]);
  // const getReg = useCallback(() => {
  //     setLoading(true); // Set loading to true before API call
  //     _get(`vendors?query_type=select-all&plate_no=${filter}`, (resp) => {
  //         setLoading(false); // Set loading to false after receiving response
  //         if (resp.success && resp.results) {
  //         setData(resp.results);
  //         }
  //     });
  // }, [filter]);
  // useEffect(() => {
  // getReg();
  // }, [getReg]);
  return (
    <div className="">
      {/* {JSON.stringify(query.get("vendor_org_email"))} */}
      <header>
        <h4
          className="app_title text-center"
          style={{
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          {" "}
          Vendor Info{" "}
        </h4>
        <button
          className="app_button text-right"
          style={{
            width: 150,
            padding: 10,
            marginLeft: 15,
            color: "#000",
            textAlign: "center",
          }}
          onClick={() => navigate(`/vendorReg/detail/${vendor.id}`)}
        >
          Back
        </button>
      </header>
      <hr style={{ width: "100%" }} />
      <Col md={12}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Col md={12}>
            <div className="search1">
              <CiSearch
                style={{
                  fontSize: 30,
                  width: 25,
                  marginTop: 3,
                  color: "#000",
                }}
              />
              <Input
                style={{
                  position: "relative",
                  width: "100%",
                  fontSize: 20,
                  top: -5,
                  boxShadow: 0,
                }}
                name="filter"
                // value={filter}
                type="text"
                className="app_input2"
                onChange={({ target: { value } }) => setFilter(value)}
                placeholder="Search: eg. Vendor Name | Vendor ID"
              />
            </div>
          </Col>
          <Label
            // onClick={getReg}
            className="label_title1"
            style={{ color: "#000", cursor: "pointer" }}
          >
            Search
          </Label>
        </div>
      </Col>
      <Col md={12}>
        <Card
          className="container shadow app_card mt-5"
          style={{ marginTop: "20px", paddingTop: "20px" }}
        >
          <Table striped>
            <tbody>
              <tr>
                <th width="20%">ID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{query.get("vendor_name")}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{query.get("vendor_org_phone")}</td>
              </tr>
              <tr>
                <th>Vendor email</th>
                <td>{query.get("vendor_org_email")}</td>
              </tr>
              <tr>
                <th>Office Address </th>
                <td>{query.get("vendor_ofiice_address")}</td>
              </tr>
            </tbody>
          </Table>
          {/* <div>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>ID : </h1>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{id}</span></div>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Name :</h1>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{query.get("vendor_name")} </span></div>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Phone Number : </h1>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{query.get("vendor_org_phone")}</span></div>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Vendor email : </h1>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{query.get("vendor_org_email")}</span></div>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Office Address :</h1>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{query.get("vendor_ofiice_address")}</span></div>
          </div> */}
        </Card>
      </Col>
    </div>
  );
}
