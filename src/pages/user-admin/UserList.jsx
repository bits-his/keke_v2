import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Spinner, Table } from "reactstrap";
import { _get } from "../../lib/Helper";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await _get("get-all-users");
        _get("get-all-users", (result) => {
          if (result && result.success) {
            setData(result.results);
          } else {
            throw new Error("Unexpected error or data format");
          }
        });
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //   const getData = useCallback(() => {
  //     fetch('http://localhost:44405/get-all-users')
  //     _get(`get-all-users`, (resp) => {
  //       if (resp.success && resp.results) {
  //         setData(resp.results[0]);
  //       }
  //     });
  //   }, []);

  //   useEffect(() => {
  //     getData();
  //   }, [getData]);

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
      <Row>
        <Col
          md={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 className="app_title">Admin Dashboard</h4>
          <button
            className="app_button"
            style={{
              width: 150,
              padding: 10,
              marginLeft: 15,
              color: "#000",
              borderRadius: 7,
            }}
            onClick={() => navigate("/user-admin-new")}
          >
            Create New User
          </button>
        </Col>
      </Row>
      <hr style={{ width: "100%" }} />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          {error}
        </div>
      ) : (
        <Table bordered responsive>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>S/N</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>User Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.username}</td>
                <td style={{ textAlign: "center" }}>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
