import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormFeedback } from "reactstrap";
import { stateLga } from "../../assets/stateLga";
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

export default function RegistrationTable() {
  const navigate = useNavigate();
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
  const handleChangeSelect = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);

    // console.log(form);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Submit the form data
      _post(
        "vehicles/registration",
        form,
        (res) => {
          setLoading(false);
          if (res.success) {
            toast.success("Vehicle added successfully");
            navigate(-1);
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

  // const handleCopyOwner = () => {};

  return (
    <>

      <Card className="w-">
        <div className="flex flex-row justify-center">
          <span className="p-6 mr-auto">
            <Button onClick={() => navigate(-1)}>Back</Button>
          </span>
          <CardHeader className=" flex-row">
            <CardTitle className="text-center ">New Vehicle</CardTitle>
            {/* <CardDescription>create new user</CardDescription> */}
          </CardHeader>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-2 pt-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="plate_no">Plate NO</Label>
                <Input
                  id="plate_no"
                  name="plate_no"
                  value={form.plate_no}
                  placeholder="Plate NO"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.plate_no}
                />
                <span style={{ color: "red" }}></span>
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.plate_no}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  name="pin"
                  value={form.pin}
                  placeholder="pin"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.pin}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.pin}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="engine_no">Engine No</Label>
                <Input
                  id="engine_no"
                  name="engine_no"
                  value={form.engine_no}
                  placeholder="Engine Number"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.engine_no}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.engine_no}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="vehicle_make">Vehicle Make</Label>
                <Input
                  id="vehicle_make"
                  name="vehicle_make"
                  value={form.vehicle_make}
                  placeholder="Vehicle Make"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.vehicle_make}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.vehicle_make}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="chasis_no">Chasis No</Label>
                <Input
                  id="chasis_no"
                  name="chasis_no"
                  value={form.chasis_no}
                  placeholder="Chasis No"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.chasis_no}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.chasis_no}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="vehicle_model">Vehicle Modal</Label>
                <Input
                  id="vehicle_model"
                  name="vehicle_model"
                  value={form.vehicle_model}
                  placeholder="Vehicle Modal"
                  type="text"
                  onChange={handleChange}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.vehicle_model}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  value={form.color}
                  placeholder="Color"
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.color}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.color}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="engine_capacity">Engine Capacity</Label>
                <Input
                  id="engine_capacity"
                  name="engine_capacity"
                  value={form.engine_capacity}
                  type="text"
                  placeholder="Engine Capacity"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>State *</Label>
                <Select
                  onValueChange={(value) =>
                    handleChangeSelect("state_registered", value)
                  }
                  invalid={!!errors.state_registered}
                  value={form.state_registered}
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
                  <span style={{ color: "red" }}>
                    {errors.state_registered}
                  </span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>LGA *</Label>
                <Select
                  onValueChange={(value) =>
                    handleChangeSelect("registered_lg", value)
                  }
                  value={form.registered_lg}
                  invalid={!!errors.registered_lg}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateLga
                      .find((item) => item.state === form.state_registered)
                      ?.lgas.map((lga, idx) => (
                        <SelectItem key={idx} value={lga}>
                          {lga}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.registered_lg}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lg_reg_no">L.G.A NO.</Label>
                <Input
                  id="lg_reg_no"
                  name="lg_reg_no"
                  value={form.lg_reg_no}
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  invalid={!!errors.lg_reg_no}
                />
                <span style={{ color: "red" }}></span>
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.lg_reg_no}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date_issued">Date Issued</Label>
                <Input
                  id="date_issued"
                  name="date_issued"
                  value={form.date_issued}
                  type="date"
                  onChange={handleChange}
                  invalid={!!errors.date_issued}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.date_issued}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="purchased_date">Purchased Date</Label>
                <Input
                  id="purchased_date"
                  name="purchased_date"
                  value={form.purchased_date}
                  type="date"
                  onChange={handleChange}
                  invalid={!!errors.purchased_date}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.purchased_date}</span>
                </FormFeedback>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  name="expiry_date"
                  value={form.expiry_date}
                  type="date"
                  onChange={handleChange}
                  invalid={!!errors.expiry_date}
                />
                <FormFeedback>
                  <span style={{ color: "red" }}>{errors.expiry_date}</span>
                </FormFeedback>
              </div>
            </div>

            <Card className="mt-3 ">
              {/* {sidebarModules.map((item, index) => (
              <div
                key={index}
                className="grid w-full items-center gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5"
              >
                <div className="flex flex-col space-y-1.5">
                  <label>
                    <input
                      type="checkbox"
                      checked={form.accessTo.includes(item.title)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <b>{item.title}</b>
                  </label>
                </div>
                {form.accessTo.includes(item.title)
                  ? item.subMenu && renderSubMenu(item.subMenu)
                  : ""}
              </div>
            ))} */}
            </Card>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </>
  );
}
