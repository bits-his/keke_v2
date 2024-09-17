import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormFeedback } from "reactstrap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
import VendorDropdown from "../Component/VendorDropdown";
import { stateLga } from "../../assets/stateLga";
import { _post } from "../../lib/Helper";
import { Loader2 } from "lucide-react";

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
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleChangeSelect = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleNextStep = () => {
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setForm((p) => ({ ...p, step: p.step + 1 }));
    }
  };

  const handleSubmit = (e) => {
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
    if (!formData.vendor.trim()) {
      newErrors.vendor = "Vendor must be filled";
    }

    return newErrors;
  };

  return (
    <div>
      <Card>
        {/* {JSON.stringify({ form })} */}
        <CardHeader className="p-0">
          <div className="flex flex-row justify-center">
            <span className="p-6 mr-auto">
              <Button onClick={() => navigate("/superagenttable")}>Back</Button>
            </span>
            <CardHeader className=" flex-row">
              <CardTitle className="text-center ">Create Super Agent</CardTitle>
              {/* <CardDescription>create new user</CardDescription> */}
            </CardHeader>
          </div>
        </CardHeader>
        <CardContent>
          <form className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label for="vendor">Vendor</Label>
                <VendorDropdown
                  handleChange={handleChange}
                  selectedVendorValue={form.vendor}
                  invalid={!!errors.vendor}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.vendor}</span>
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
    </div>
  );
}
