import React, { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Input,
  Label,
} from "reactstrap";
import { _get, separator } from "../../lib/Helper";
import { useLocation } from "react-router-dom";

export default function SuperAgentTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state && location.state.formData;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [query, setQuery] = useState("select-all");

  const search = () => {
    setQuery("search");
  };

  const getReg = useCallback(() => {
    setLoading(true);
    _get(`superagent?query_type=${query}&name=${filter}`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        setData(resp.results);
      }
    });
  }, [query]);

  useEffect(() => {
    getReg();
  }, [getReg]);
  useEffect(() => {
    if (!filter) {
      setQuery("select-all");
    }
  }, [filter]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewUser = (userData) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

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
          <h4 className="app_title"> Super Agents </h4>
          <button
            className="app_button"
            style={{
              width: 150,
              padding: 10,
              marginLeft: 15,
              color: "#000",
              borderRadius: 7,
            }}
            onClick={() => navigate("/superagent")}
          >
            Add SuperAgent
          </button>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col md={12}>
          <div className="search-bar-box">
            <div className="search">
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
                  top: -4,
                  boxShadow: "none",
                }}
                name="filter"
                value={filter}
                type="text"
                className="app_input2"
                onChange={({ target: { value } }) => setFilter(value)}
                placeholder="Search for super agent"
              />
            </div>

            <Label
              onClick={search}
              className="label_title"
              style={{ cursor: "pointer" }}
            >
              Search
            </Label>
          </div>
        </Col>

        <div className="table_overflow">
          {loading ? ( // Display spinner if loading is true
            <Spinner
              color="warning"
              className="spinner"
              type="grow"
              style={{ margin: "20px auto" }}
            >
              ""
            </Spinner>
          ) : data.length === 0 ? (
            <Table
              bordered
              responsive
              style={{
                position: "relative",

                width: "100%",
                marginTop: "4px",
              }}
            >
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    No super Agent {filter} found
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Table
              bordered
              responsive
              style={{
                position: "relative",

                width: "100%",

                marginTop: "4px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>S/N</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Phone</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Balance</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((agent, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{agent.name}</td>
                    <td>{agent.phone}</td>
                    <td>{agent.email}</td>
                    <td className="text-right">{separator(agent.balance)}</td>
                    <td className="text-center">
                      <Button
                        color="info"
                        onClick={() => navigate(`/superagenttopup`)}
                      >
                        Topup
                      </Button>{" "}
                      <Button
                        color="success"
                        onClick={() =>
                          navigate(
                            `/superagenttable/view/${agent.super_agent_id}`
                          )
                        }
                      >
                        View History
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Row>
    </Card>
  );
}
