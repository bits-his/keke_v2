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
  FormFeedback,
} from "reactstrap";
import { stateLga } from "../../assets/state_and_lgas";
import toast from "react-hot-toast";
import useQuery, { _post } from "../../lib/Helper";
import { useSelector } from "react-redux";
import SuperAgentDropdown from "./SuperAgentDropdown";

export default function Agent() {
  const query = useQuery();
  const super_name = query.get("name");
  const { user } = useSelector((p) => p.auth);
  const _form = {
    query_type: "create",
    name: "",
    phone_no: "",
    nin: "",
    state: "",
    lga: "",
    address: "",
    email: "",
    super_agent: super_name,
    service_location: "",
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(_form);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  // console.log(form)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      _post(
        "agents/create",
        form,
        (res) => {
          setLoading(false); // Set loading to false when submission is successful
          toast.success("Agent created successfully");
          // setSubmittedData([...submittedData, res]);
          navigate("/agenttable");
        },
        (err) => {
          console.log(err);
          toast.error("An error occurred while creating Agent");
          setLoading(false);
        }
      );
    } else {
      Object.values(newErrors).forEach((error) => {
        // toast.error(error);
      });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name must be filled";
    }
    // if (!formData.phone_no.trim()) {
    //   newErrors.phone_no = "Phone Number must be filled";
    // }
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
    if (!formData.service_location.trim()) {
      newErrors.service_location = "Service Location must be filled";
    }

    return newErrors;
  };

  return (
    <div>
      <Card className="app_card dashboard_card m-0 p-0">
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                className="app_button"
                style={{
                  width: "10rem",
                  padding: 10,
                  color: "#000",
                  borderRadius: 10,
                }}
                onClick={() => navigate("/agenttable")}
              >
                Back
              </button>
              <h4 className="app_title vendor_title">Agent Registration</h4>
            </div>
            <hr />
          </Col>
          <Col md={12}>
            <Form className="mx-auto">
              {/* {JSON.stringify(  )} */}
              <>
                <Row className="margin-bottom-input">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="super_agent">Super Agent</Label>

                      <SuperAgentDropdown
                        handleChange={handleChange}
                        selectedVendorValue={form.super_id}
                        invalid={!!errors.super_agent}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>
                          {errors.super_agent}
                        </span>
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
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        value={form.phone}
                        type="tel"
                        className="app_input"
                        invalid={!!errors.phone_no}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.phone_no}</span>
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
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="state">State</Label>
                      <Input
                        onChange={handleChange}
                        id="state"
                        name="state"
                        value={form.state}
                        type="select"
                        className="app_input"
                        invalid={!!errors.state}
                      >
                        <option value={""}>Select State</option>
                        {stateLga.map((item, idx) => (
                          <option key={idx}>{item.state}</option>
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
                        value={form.lga}
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
                      <Label for="address">Contact address</Label>
                      <Input
                        onChange={handleChange}
                        id="address"
                        name="address"
                        value={form.address}
                        type="textarea"
                        className="app_input"
                        rows="1.5"
                        invalid={!!errors.address}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>{errors.address}</span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="service_location">Service Location</Label>
                      <Input
                        onChange={handleChange}
                        id="service_location"
                        name="service_location"
                        value={form.service_location}
                        placeholder="Bata"
                        type="text"
                        className="app_input"
                        invalid={!!errors.service_location}
                      />
                      <FormFeedback>
                        <span style={{ color: "red" }}>
                          {errors.service_location}
                        </span>
                      </FormFeedback>
                    </FormGroup>
                  </Col>
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
