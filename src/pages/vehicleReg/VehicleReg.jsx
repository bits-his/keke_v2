import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { stateLga } from "../../assets/state_and_lgas";
import { _post } from "../../lib/Helper";
import toast from "react-hot-toast";

export default function RegistrationTable() {
  const { id } = useParams();
  const _form = {
    owner_id: id,
    lg_reg_no: "",
    pin: "",
    engine_no: "",
    plate_no: "",
    color: "",
    vehicle_make: "",
    vehicle_model: "",
    engine_capacity: "",
    chasis_no: "",
    date_issued: "",
    purchased_date: "",
    state_registered: "",
    registered_lg: "",
    expiry_date: "",
  };

  const [form, setForm] = useState(_form);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      console.log(form);
      // Submit the form data
      _post(
        "vehicles/registration",
        form,
        (res) => {
          setLoading(false);
          if (res.success) {
            toast.success("Vehicle added successfully");
            navigate("/vehicleownertable");
            setForm(_form);
          }
        },
        (err) => {
          setLoading(false);
          console.log(err);
          toast.error("An error occurred while submitting the form");
        }
      );
    } else {
      Object.values(newErrors).forEach((error) => {
        // toast.error(error);
      });
    }
  };

  // Function to perform form validation
  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.plate_no.trim()) {
      newErrors.plate_no = "Plate No must be filled";
    }
    if (!formData.pin.trim()) {
      newErrors.pin = "PIN must be filled";
    }
    if (!formData.engine_no.trim()) {
      newErrors.engine_no = "Engine No must be filled";
    }
    if (!formData.vehicle_make.trim()) {
      newErrors.vehicle_make = "Vehicle make must be filled";
    }
    if (!formData.vehicle_model.trim()) {
      newErrors.vehicle_model = "Vehicle model must be filled";
    }
    if (!formData.engine_capacity.trim()) {
      newErrors.engine_capacity = "Engine Capacity must be filled";
    }
    if (!formData.color.trim()) {
      newErrors.color = "Color must be filled";
    }
    if (!formData.date_issued.trim()) {
      newErrors.date_issued = "Date Issued must be filled";
    }
    if (!formData.state_registered.trim()) {
      newErrors.state_registered = "State Registered must be filled";
    }
    if (!formData.registered_lg.trim()) {
      newErrors.registered_lg = "L.G.A. Registered must be filled";
    }
    if (!formData.lg_reg_no.trim()) {
      newErrors.lg_reg_no = "L.G.A. Reg. No must be filled";
    }
    if (!formData.chasis_no.trim()) {
      newErrors.chasis_no = "Chasis No must be filled";
    }
    if (!formData.purchased_date.trim()) {
      newErrors.purchased_date = "Purchased Date must be filled";
    }
    if (!formData.expiry_date.trim()) {
      newErrors.expiry_date = "Expiry Date must be filled";
    }

    return newErrors;
  };

  const handleCopyOwner = () => {};

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
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
            <button
              className="app_button"
              style={{
                width: 150,
                padding: 10,
                color: "#000",
                borderRadius: 10,
              }}
              onClick={() => navigate("/Vehicleownertable")}
            >
              Back
            </button>
            <h4 className="app_title">Vehicle Registeration </h4>
          </div>

          <hr />
        </Col>
        <Col md={12}>
          <Form onSubmit={handleSubmit} className="mx-auto">
            <>
              <Row className="margin-bottom-input">
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="plate_no">Plate No</Label>
                    <Input
                      onChange={handleChange}
                      id="plate_no"
                      name="plate_no"
                      value={form.plate_no}
                      placeholder="Vehicle's Plate No"
                      type="text"
                      className="app_input"
                      invalid={!!errors.plate_no}
                    />
                    <span style={{ color: "red" }}></span>
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.plate_no}</span>
                    </FormFeedback>
                    {/* {errors.expiry_date && <span style={{ color: 'red' }}>{errors.expiry_date}</span>} */}
                  </FormGroup>
                </Col>
                <Col md={4} className="">
                  <FormGroup>
                    <Label for="pin">PIN</Label>
                    <Input
                      onChange={handleChange}
                      id="pin"
                      name="pin"
                      value={form.pin}
                      placeholder="PINXXXXXXXXXX28"
                      type="text"
                      className="app_input"
                      invalid={!!errors.pin}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.pin}</span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="engine_no">Engine No.</Label>
                    <Input
                      onChange={handleChange}
                      id="engine_no"
                      name="engine_no"
                      value={form.engine_no}
                      placeholder="Engine No."
                      type="text"
                      className="app_input"
                      invalid={!!errors.engine_no}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.engine_no}</span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="margin-bottom-input">
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="vehicle_make">Vehicle make</Label>
                    <Input
                      onChange={handleChange}
                      id="vehicle_make"
                      name="vehicle_make"
                      value={form.vehicle_make}
                      placeholder="Toyota"
                      type="text"
                      className="app_input"
                      invalid={!!errors.vehicle_make}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.vehicle_make}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="vehicle_model">Vehicle model</Label>
                    <Input
                      onChange={handleChange}
                      id="vehicle_model"
                      name="vehicle_model"
                      value={form.vehicle_model}
                      placeholder="Sienna"
                      type="text"
                      className="app_input"
                      invalid={!!errors.vehicle_model}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.vehicle_model}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="date_issued">Date issued</Label>
                    <Input
                      onChange={handleChange}
                      id="date_issued"
                      name="date_issued"
                      value={form.date_issued}
                      type="date"
                      className="app_input"
                      invalid={!!errors.date_issued}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.date_issued}</span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="margin-bottom-input">
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="state_registered">State Registered</Label>
                    <Input
                      onChange={handleChange}
                      id="state_registered"
                      name="state_registered"
                      type="select"
                      className="app_input"
                      invalid={!!errors.state_registered}
                    >
                      <option value="">Select State</option>
                      {stateLga.map((item, idx) => (
                        <option key={idx}>{item.state}</option>
                      ))}
                    </Input>
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.state_registered}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="registered_lg">L.G.A. Registred</Label>
                    <Input
                      onChange={handleChange}
                      id="registered_lg"
                      name="registered_lg"
                      type="select"
                      className="app_input"
                      invalid={!!errors.registered_lg}
                    >
                      <option value="">--Select LGA--</option>
                      {stateLga
                        .filter(
                          (item) => item.state === form.state_registered
                        )[0]
                        ?.lgas?.map((lga, idx) => (
                          <option key={idx}>{lga}</option>
                        ))}
                    </Input>
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.registered_lg}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="lg_reg_no">L.G.A. Reg. No.</Label>
                    <Input
                      onChange={handleChange}
                      id="lg_reg_no"
                      name="lg_reg_no"
                      type="text"
                      value={form.lg_reg_no}
                      className="app_input"
                      invalid={!!errors.lg_reg_no}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}></span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="margin-bottom-input">
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="chasis_no">Chasis No</Label>
                    <Input
                      onChange={handleChange}
                      id="chasis_no"
                      name="chasis_no"
                      value={form.chasis_no}
                      placeholder="Vehicle's chasis No"
                      type="text"
                      className="app_input"
                      invalid={!!errors.chasis_no}
                    />
                    <FormFeedback>
                      <spann style={{ color: "red" }}>{errors.chasis_no}</spann>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="color">Color</Label>
                    <Input
                      onChange={handleChange}
                      name="color"
                      id="color"
                      value={form.color}
                      placeholder="Color"
                      type="text"
                      className="app_input"
                      invalid={!!errors.color}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.color}</span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="engine_capacity">Engine Capacity</Label>
                    <Input
                      onChange={handleChange}
                      id="engine_capacity"
                      name="engine_capacity"
                      value={form.engine_capacity}
                      placeholder="Engine Capacity"
                      type="text"
                      className="app_input"
                      invalid={!!errors.engine_capacity}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.engine_capacity}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="purchased_date">Transaction Date</Label>
                    <Input
                      onChange={handleChange}
                      name="purchased_date"
                      id="purchased_date"
                      value={form.purchased_date}
                      placeholder="Transaction Date"
                      type="date"
                      className="app_input"
                      invalid={!!errors.purchased_date}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>
                        {errors.purchased_date}
                      </span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4} className="first-col">
                  <FormGroup>
                    <Label for="expiry_date">Expiry Date</Label>
                    <Input
                      onChange={handleChange}
                      id="expiry_date"
                      name="expiry_date"
                      value={form.expiry_date}
                      placeholder="Expiry Date"
                      type="date"
                      className="app_input"
                      invalid={!!errors.expiry_date}
                    />
                    <FormFeedback>
                      <span style={{ color: "red" }}>{errors.expiry_date}</span>
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
            </>
            <Row
              className="mt-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                marginTop: 30,
              }}
            >
              <Col className="text-right">
                <button
                  className="app_button"
                  style={{
                    width: 150,
                    marginLeft: 30,
                    padding: 10,
                    color: "",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
