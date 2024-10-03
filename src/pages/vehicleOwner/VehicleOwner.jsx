import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormFeedback } from "reactstrap";
import { stateLga } from "../../assets/stateLga";
// import { useSelector } from "react-redux";
import { _post } from "../../lib/Helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function OwnerReg() {
  const navigate = useNavigate();
  // const { user } = useSelector((s) => s.auth);
  // const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const _form = {
    query_type: "insert",
    agent_id: null,
  };
  const [form, setForm] = useState(_form);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleChangeSelect = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    _post(`vehicle-owners/create`, form, (res) => {
      console.log(res);
      if (res.success) {
        toast.success(`A new Vehicle owner ${form.name} Created Successfully`);
        navigate("/vehicleowners");
      } else {
         toast.error(res.error.errors[0].message);
      }
    });
  };

  return (
    <>
      {/* <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
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
              <h4 className="app_title">Vehicle Owner Registrationhmmm</h4>
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
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card> */}
      <Card className="w-">
        <div className="flex flex-row justify-center">
          <span className="p-6 mr-auto">
            <Button onClick={() => navigate("/vehicleowners")}>Back</Button>
          </span>
          <CardHeader className=" flex-row">
            <CardTitle className="text-center ">New Vehicle Owner</CardTitle>
            {/* <CardDescription>create new user</CardDescription> */}
          </CardHeader>
        </div>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-2 pt-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="OwnerName">Owners Name</Label>
                <Input
                  id="OwnerName"
                  name="name"
                  value={form.name}
                  placeholder="Owner's Name"
                  type="text"
                  onChange={handleChange}
                  required
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.phone}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phane</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  placeholder="phone"
                  type="tel"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  placeholder="Address"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="orgEmail">Email</Label>
                <Input
                  id="orgEmail"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nin">NIN</Label>
                <Input
                  id="nin"
                  name="nin"
                  value={form.nin}
                  placeholder="NIN"
                  type="number"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>State *</Label>
                <Select
                  onValueChange={(value) => handleChangeSelect("state", value)}
                  value={form.state}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {stateLga.map((item, idx) => (
                        <SelectItem key={idx} value={item.state}>
                          {item.state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>LGA *</Label>
                <Select
                  onValueChange={(value) => handleChangeSelect("lga", value)}
                  value={form.lga}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateLga
                      .find((item) => item.state === form.state)
                      ?.lgas.map((lga, idx) => (
                        <SelectItem key={idx} value={lga}>
                          {lga}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
