import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
} from "reactstrap";
import VendorDropdown from "./VendorDropdown";
import { stateLga } from "../../assets/state_and_lgas";
import { _post } from "../../lib/Helper";
import toast from "react-hot-toast";
import keke from "../../assets/keke_napep.png";

export default function SuperAgent() {
  // const user = "nazif";
  const _form = {
    query_type: "insert",
    name: "",
    phone: "",
    nin: "",
    state: "",
    lga: "",
    address: "",
    vendor: "",
    email: "",
  };

  const [form, setForm] = useState(_form);
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (loading) return;
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      _post(
        "superagent/create",
        form,
        (res) => {
          setLoading(true);
          toast.success("super agent created successfully");
          setSubmittedData([...submittedData, res]);
          navigate("/superagenttable");
        },
        () => {
          setLoading(false);
          toast.error("An error occurred while creating super agent");
        }
      );
    } else {
      Object.values(newErrors).forEach((error) => {});
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name must be filled";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number must be filled";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email must be filled";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State must be filled";
    }
    if (!formData.lga.trim()) {
      newErrors.lga = "L.G.A.  must be filled";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address must be filled";
    }
    if (!formData.nin.trim()) {
      newErrors.nin = "NIN must be filled";
    }

    return newErrors;
  };

  return (
    <div>
      {/* <button className="app_button" onClick={() => navigate("/agent")}>
        Create agent
      </button> */}
      <Card className="app_card dashboard_card m-0 p-0">
        {/* {JSON.stringify({ form })} */}
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Back Button */}

              <Button
                className="app_button"
                style={{
                  width: 150,
                  padding: 10,
                  marginLeft: 15,
                  color: "#000",
                  borderRadius: 10,
                }}
                onClick={() => navigate("/superagenttable")}
              >
                Back
              </Button>

              {/* Title */}
              <h4 className="app_title">Create Super Agent</h4>

              {/* User DP */}
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
          </Col>
          <Col md={12}>
            <Form className="mx-auto">
              <>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="vendor">Vendor</Label>
                      <VendorDropdown
                        handleChange={handleChange}
                        selectedVendorValue={form.vendor}
                        invalid={!!errors.vendor}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.vendor}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        onChange={handleChange}
                        id="name"
                        name="name"
                        value={form.name}
                        placeholder="John Doe"
                        type="text"
                        className="app_input"
                        invalid={!!errors.name}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.name}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="margin-bottom-input">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        value={form.phone}
                        type="tel"
                        pattern="[0-9]{11}"
                        placeholder="081XXXXXXXX"
                        className="app_input"
                        invalid={!!errors.phone}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.phone}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        value={form.email}
                        placeholder="organization@fake.com"
                        type="email"
                        className="app_input"
                        invalid={!!errors.email}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.email}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={12} className="first-col">
                    <FormGroup>
                      <Label for="address">Contact address</Label>
                      <Input
                        onChange={handleChange}
                        id="address"
                        name="address"
                        vlaue={form.address}
                        type="text"
                        className="app_input"
                        invalid={!!errors.address}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.address}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="state">State</Label>
                      <Input
                        onChange={handleChange}
                        id="state"
                        name="state"
                        type="select"
                        className="app_input"
                        invalid={!!errors.state}
                      >
                        <option value={""}>Select State</option>
                        {stateLga.map((item) => (
                          <option>{item.state}</option>
                        ))}
                      </Input>
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.state}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="lga">LGA</Label>
                      <Input
                        onChange={handleChange}
                        id="lga"
                        name="lga"
                        type="select"
                        className="app_input"
                        invalid={!!errors.lga}
                      >
                        <option value={""}>--Select LGA--</option>
                        {stateLga
                          .filter((item) => item.state === form.state)[0]
                          ?.lgas?.map((lga, idx) => (
                            <option key={idx}>{lga}</option>
                          ))}
                      </Input>
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.lga}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="nin">NIN</Label>
                      <Input
                        onChange={handleChange}
                        id="nin"
                        name="nin"
                        value={form.nin}
                        placeholder="NIN"
                        type="text"
                        className="app_input"
                        invalid={!!errors.nin}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.nin}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        onChange={handleChange}
                        id="Password"
                        name="password"
                        value={form.password}
                        placeholder="Select Password"
                        type="password"
                        className="app_input"
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
              </>
              <Row>
                <Col
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
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
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
