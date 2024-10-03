import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // Card,
  // Col,
  // Row,
  // Form,
  // FormGroup,
  // Label,
  // Input,
  FormFeedback,
} from "reactstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SuperAgentDropdown from "../Component/SuperAgentDropdown";
import { stateLga } from "../../assets/stateLga";
import useQuery, { _post } from "../../lib/Helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Agent() {
  const query = useQuery();
  const super_name = query.get("name");
  const { user } = useSelector((p) => p.auth);
  const _form = {
    query_type: "create",
    name: "",
    phone: "",
    nin: "",
    state: "",
    lga: "",
    address: "",
    email: "",
    super_agent: "",
    service_location: "",
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(_form);
  const [errors, setErrors] = useState({});

  const handleChangeSelect = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);
    // console.log(form)

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      _post(
        "agents/create",
        form,
        (res) => {
          if (res.status === "success") {
            setLoading(false); 
            toast.success("Agent created successfully");
            navigate("/agenttable");
          }
          else{
            setLoading(false); 
            toast.error(res.error.errors[0].message);
          }
        },
        (err) => {
          console.log(err);
          toast.error("An error occurred while creating Agent");
          setLoading(false);
        }
      );
      console.log(form)
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone must be filled";
    }

    return newErrors;
  };

  return (
    <>
      <Card>
        {/* {JSON.stringify({ form })} */}
        <CardHeader className="p-2">
          <div className="flex flex-row justify-center">
            <span className="p-3 px-2 mr-auto">
              <Button onClick={() => navigate("/agenttable")}>Back</Button>
            </span>
            <CardHeader className=" flex-row  p-3 px-5 pb-6">
              <CardTitle className="text-center">Create New Agent</CardTitle>
              {/* <CardDescription>create new user</CardDescription> */}
            </CardHeader>
          </div>
          {/* <CardTitle className="text-center">Agent Registration</CardTitle> */}
        </CardHeader>
        <CardContent>
          <form className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label for="vendor">Super Agent</Label>
                <SuperAgentDropdown
                  handleChange={handleChange}
                  selectedSuperAgentValue={form.super_agent}
                  invalid={!!errors.super_agent}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.super_agent}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
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
              </div>

              <div className="flex flex-col space-y-1.5">
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
              </div>
              <div className="flex flex-col space-y-1.5">
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
              </div>
              <div className="flex flex-col space-y-1.5">
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
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label for="state">State</Label>
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
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.state}</span>
                </FormFeedback>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label for="lga">LGA</Label>
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
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.lga}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
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
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          {/* <Button variant="outline">Cancel</Button> */}
          <Button className="float-right" type="submit" onClick={handleSubmit}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
