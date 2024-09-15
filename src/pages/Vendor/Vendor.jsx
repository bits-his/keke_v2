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
  Spinner,
} from "reactstrap";
import { stateLga } from "../../assets/state_and_lgas";
import { _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import toast from "react-hot-toast";

export default function RegistrationTable() {
  const _form = {
    query_type: "insert",
    vendor_name: "",
    vendor_ofiice_address: "",
    vendor_state: "",
    vendor_lga: "",
    vendor_phone: "",
    vendor_email: "",
    vendor_tin: "",
    vendor_profile: "",
    vendor_bn_rc: "",
    contact_name: "",
    contact_address: "",
    contact_state: "",
    contact_phone: "",
    contact_email: "",
    contact_lga: "",
    contact_password: 123456,
  };

  const [submittedData, setSubmittedData] = useState([]);
  const [form, setForm] = useState(_form);
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const navigate = useNavigate();

  // if (form.step === 0) {
  //   if (!form.vendor_name || !form.vendor_ofiice_address || !form.vendor_state || !form.vendor_lga || !form.vendor_phone || !form.vendor_email) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  // }
  // else {
  //   if (!form.contact_name || !form.contact_address || !form.contact_state || !form.contact_lga || !form.contact_phone || !form.contact_email || !form.contact_password) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  // }

  const validate = (e) => {
    e.preventDefault();

    if (
      !form.vendor_name ||
      !form.vendor_ofiice_address ||
      !form.vendor_state ||
      !form.vendor_lga ||
      !form.vendor_phone ||
      !form.vendor_email
    ) {
      toast.error("Please fill in all required fields.");
    } else {
      toast.success("Good.");
      setForm((p) => ({ ...p, step: 1 }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.contact_name ||
      !form.contact_address ||
      !form.contact_state ||
      !form.contact_lga ||
      !form.contact_phone ||
      !form.contact_email
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    _post(
      "vendors/create",
      form,
      (res) => {
        if (res.success) {
          setLoading(false);
          toast.success("Vendor created successfully");
          setSubmittedData([...submittedData, res]);
          navigate("/vendorReg");
        }
      },
      () => {
        setLoading(false);
        toast.error("An error occurred while creating Vendor");
      }
    );
  };

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
      {/* {JSON.stringify({ form })} */}
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
              onClick={() => navigate("/vendorReg")}
            >
              Back
            </button>
            <h4 className="app_title vendor_title">
              {form.step > 0 ? "Vendor contact person" : "Vendor Registeration"}
            </h4>
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
            {form.step > 0 ? (
              <>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="contact_name">
                        Contact Name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_name"
                        name="contact_name"
                        value={form.contact_name}
                        placeholder="Vendor's contact name"
                        type="text"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contact_phone">
                        Contact Phone <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_phone"
                        name="contact_phone"
                        value={form.contact_phone}
                        placeholder="+234-8100000000"
                        type="tel"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="contact_address">
                        Contact Address <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_address"
                        name="contact_address"
                        value={form.contact_address}
                        type="text"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contact_email">
                        Contact E-mail <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_emailexample"
                        value={form.contact_email}
                        name="contact_email"
                        placeholder="organization@fake.com"
                        type="email"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="contact_state">
                        State of Residence{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_state"
                        name="contact_state"
                        type="select"
                        value={form.contact_state}
                        className="app_input"
                        required
                      >
                        <option value={""}>Select State</option>
                        {stateLga.map((item) => (
                          <option>{item.state}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contact_lga">
                        L.G.A. of Residence{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="contact_lga"
                        name="contact_lga"
                        type="select"
                        required
                        value={form.contact_lga}
                        className="app_input"
                      >
                        <option value={""}>--Select LGA--</option>
                        {stateLga
                          .filter(
                            (item) => item.state === form.contact_state
                          )[0]
                          ?.lgas?.map((lga, idx) => (
                            <option key={idx}>{lga}</option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                {/* <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleDOB">Password <span style={{ color: "red" }}>*</span></Label>
                      <Input
                        onChange={handleChange}
                        id="examplePassword"
                        name="contact_password"
                        value={form.contact_password}
                        placeholder="Enter Password"
                        type="password"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
              </>
            ) : (
              <>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="vendor_name">
                        Vendor's name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_name"
                        name="vendor_name"
                        placeholder="Vendor name"
                        type="text"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="vendor_phone">
                        Organization's phone{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_phone"
                        name="vendor_phone"
                        value={form.vendor_phone}
                        placeholder="+234-8100000000"
                        type="tel"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="vendor_ofiice_address">
                        Office Address <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_ofiice_address"
                        name="vendor_ofiice_address"
                        value={form.vendor_ofiice_address}
                        type="text"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="vendor_email">
                        Organization's email{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_emailexample"
                        name="vendor_email"
                        value={form.vendor_email}
                        placeholder="organization@fake.com"
                        type="email"
                        className="app_input"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="vendor_state">
                        State <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_state"
                        name="vendor_state"
                        value={form.vendor_state}
                        type="select"
                        className="app_input"
                        required
                      >
                        <option value={""}>Select State</option>
                        {stateLga.map((item) => (
                          <option key={item.id}>{item.state}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="tin">TIN</Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_tin"
                        name="vendor_tin"
                        value={form.vendor_tin}
                        type="number"
                        className="app_input"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="margin-bottom-input">
                  <Col md={6} className="first-col">
                    <FormGroup>
                      <Label for="vendor_lga">
                        LGA <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_lga"
                        name="vendor_lga"
                        value={form.vendor_lga}
                        type="select"
                        className="app_input"
                      >
                        <option value={""}>--Select LGA--</option>
                        {stateLga
                          .filter((item) => item.state === form.vendor_state)[0]
                          ?.lgas?.map((lga, idx) => (
                            <option key={idx}>{lga}</option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="vendor_bn_rc">BN/RC</Label>
                      <Input
                        onChange={handleChange}
                        id="vendor_bn_rc"
                        name="vendor_bn_rc"
                        value={form.vendor_bn_rc}
                        type="text"
                        className="app_input"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row className="margin-bottom-input">
                  <Col md={12}>
                    <FormGroup>
                      <Label for="companyProfile">Company's Profile</Label>
                      <Input
                        onChange={handleChange}
                        id="companyProfile"
                        name="companyProfile"
                        type="file"
                        className="app_input"
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
              </>
            )}
            <Row
              className="mt-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                marginTop: 30,
              }}
            >
              {form.step > 0 ? (
                <Row
                  style={{
                    display: "flex",
                  }}
                >
                  <Col md={6} className="text-left">
                    {" "}
                    <button
                      className="app_button"
                      disabled={loading}
                      style={{
                        width: 150,
                        marginLeft: 0,
                        padding: 10,
                        color: "",
                        cursor: "pointer",
                      }}
                      onClick={() => setForm((p) => ({ ...p, step: 0 }))}
                    >
                      Prev
                    </button>
                  </Col>
                  <Col md={6} className="text-right">
                    {" "}
                    <button
                      className="app_button"
                      style={{
                        width: 150,
                        marginLeft: 0,
                        padding: 10,
                        color: "",
                        cursor: "pointer",
                      }}
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      <span>
                        {loading ? (
                          <Spinner color="primary"></Spinner>
                        ) : (
                          "Submit"
                        )}
                      </span>
                    </button>
                  </Col>
                </Row>
              ) : (
                <button
                  className="app_button p-4"
                  style={{
                    width: 150,
                    marginLeft: 30,
                    padding: 10,
                    color: "",
                    cursor: "pointer",
                  }}
                  onClick={validate}
                >
                  Next
                </button>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
