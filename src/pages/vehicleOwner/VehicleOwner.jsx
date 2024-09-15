import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import { stateLga } from "../../assets/state_and_lgas";
import { useSelector } from "react-redux";
import { _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import toast from "react-hot-toast";

export default function OwnerReg() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [showForm, setShowForm] = useState(false);
  const _form = {
    query_type: "insert",
    agent_id: null,
  };
  const [form, setForm] = useState(_form);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleBackToTable = () => {
    navigate("/Vehicleownertable");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    _post(`vehicle-owners/create`, form, (res) => {
      console.log(res);
      if (res.success) {
        toast.success(`A new Vehicle owner ${form.name} Created Successfully`);
        navigate("/Vehicleownertable");
      } else {
        toast.error("error creating owner");
      }
    });
  };

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!showForm ? (
              <Button
                className="app_button"
                style={{
                  width: 150,
                  padding: 10,
                  color: "#000",
                  borderRadius: 10,
                }}
                onClick={handleBackToTable}
              >
                Back
              </Button>
            ) : (
              <Button
                className="app_button"
                style={{
                  width: 150,
                  padding: 10,
                  color: "#000",
                  borderRadius: 10,
                }}
                onClick={handleBackToTable}
              >
                Back
              </Button>
            )}
            <h4 className="app_title">Vehicle Owner Registration</h4>
            <img src={keke} alt="keke" style={{ width: "50px" }} />
          </div>
          <hr />
        </Col>
        <Col md={12}>
          <Form>
            <Row className="margin-bottom-input">
              <Col md={6} className="first-col">
                <FormGroup>
                  <Label for="OwnerName">Owner's name</Label>
                  <Input
                    id="OwnerName"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                    placeholder="Owner's name"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={form.phone}
                    placeholder="+234-8100000000"
                    type="tel"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="margin-bottom-input">
              <Col md={6} className="first-col">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    onChange={handleChange}
                    value={form.address}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="orgEmail">Owner's email</Label>
                  <Input
                    id="orgEmail"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="owner@fake.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="margin-bottom-input">
              <Col md={6} className="first-col">
                <FormGroup>
                  <Label for="state">State of residence</Label>
                  <Input
                    onChange={handleChange}
                    id="state"
                    name="state"
                    value={form.state}
                    type="select"
                    className="app_input"
                    required
                  >
                    <option value={""}>Select State</option>
                    {stateLga.map((item, idx) => (
                      <option key={idx}>{item.state}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="nin">NIN</Label>
                  <Input
                    id="nin"
                    onChange={handleChange}
                    name="nin"
                    value={form.nin}
                    type="number"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="margin-bottom-input">
              <Col md={6} className="first-col">
                <FormGroup>
                  <Label for="lga">Local Government Area</Label>
                  <Input
                    onChange={handleChange}
                    id="lga"
                    name="lga"
                    type="select"
                    className="app_input"
                  >
                    <option value={""}>--Select LGA--</option>
                    {stateLga
                      .filter((item) => item.state === form.state)[0]
                      ?.lgas?.map((lga, idx) => (
                        <option key={idx}>{lga}</option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col
                md={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                {" "}
                <button
                  className="app_button"
                  style={{
                    width: 150,
                    padding: 10,
                    color: "",
                    cursor: "pointer",
                    borderRadius: 7,
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                {/* <button
                                    className="app_button"
                                    style={{
                                        width: 150,
                                        padding: 10,
                                        color: "",
                                        cursor: "pointer",
                                        borderRadius: 7,
                                    }}
                                    onClick={() => navigate("/VehicleReg")}
                                >
                                    prev
                                </button> */}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
    
  );
}
