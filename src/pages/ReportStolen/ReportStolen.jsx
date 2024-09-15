import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Form, Spinner } from "reactstrap";
import { _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import toast from "react-hot-toast";
import InputField from "./InputField";

export default function RegistrationTable() {
  const _form = {
    query_type: "insert",
    owners_name: "",
    owners_phone: "",
    plate_no: "",
    engine_no: "",
    chasis_no: "",
    vehicle_model: "",
    color: "",
    details: "",
  };

  const [form, setForm] = useState(_form);
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!form.Reporters_name || !form.Reporters_phone_no || !form.capacity || !form.chasis_no || !form.engine_no || !form.vehicle_model || !form.vehicle_color) {
    if (!1 === 1) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    _post(
      "stolen/report",
      form,
      (res) => {
        if (res.success) {
          setLoading(false);
          toast.success("Report submitted successfully");
          //setSubmittedData([...submittedData, res]);
          navigate("/vendorReg");
        }
      }
      // },
      // () => {
      //   setLoading(false);
      //   toast.error("An error occurred while creating Vendor");
      // }
    );
  };

  return (
    <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
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
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <h4 className="app_title vendor_title">Report stolen Vehicle</h4>
            <img
              src={keke}
              alt="Keke logo"
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
                <InputField
                  id="rname"
                  label="Owners name"
                  name="owners_name"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place="John Doe"
                />
                <InputField
                  id="phone"
                  label="Phone No."
                  name="owners_phone"
                  type="number"
                  required="true"
                  handleChange={handleChange}
                  place="080XXXXXXXXX"
                />
              </Row>
              <Row className="margin-bottom-input">
                <InputField
                  id="engine_no"
                  label="Engine No."
                  name="engine_no"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place=""
                />
                <InputField
                  id="chasis_no"
                  label="Chasis No."
                  name="chasis_no"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place=""
                />
              </Row>
              <Row className="margin-bottom-input">
                <InputField
                  id="model"
                  label="Vehicle Model"
                  name="vehicle_model"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place="TVS"
                />
                <InputField
                  id="color"
                  label="Vehicle color"
                  name="color"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place="yellow"
                />
              </Row>
              <Row className="margin-bottom-input">
                <InputField
                  id="plate_no"
                  label="plate Number"
                  name="plate_no"
                  type="text"
                  required="true"
                  handleChange={handleChange}
                  place="200hp"
                />
                <InputField
                  id="others"
                  label="Other details"
                  name="details"
                  type="textarea"
                  required="false"
                  handleChange={handleChange}
                  place=""
                  rows={1}
                />
              </Row>
            </>
            <Row
              className="mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <button
                className="app_button"
                style={{
                  width: 130,
                  marginLeft: 0,
                  padding: 10,
                  cursor: "pointer",
                }}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? <Spinner color="primary"></Spinner> : "Submit"}
              </button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
