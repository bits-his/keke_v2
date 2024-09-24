import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _get, _post, separator } from "../../lib/Helper";
import { FormFeedback } from "reactstrap";
import keke from "../../assets/keke_napep.png";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { stateLga } from "../../assets/stateLga";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VehicleList() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [data, setData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [vehicleCount, setVehicleCount] = useState([]);

  const getReg = useCallback(() => {
    _get(
      `vehicle-owners?query_type=select-all&user_id=${user.account_id}`,
      (resp) => {
        //console.log(resp)
        if (resp.success && resp.data) {
          const ownerDetail = resp.data.filter(
            (item) => item.account_id === `${user.account_id}`
          );
          //console.log(ownerDetail)
          setData(ownerDetail[0]);
        }
      }
    );

    _get(`vehicles?query_type=select&owner_id=${user.account_id}`, (resp) => {
      if (resp.success && resp.data) {
        setVehicles(resp.data);
        // console.log(resp.data)
        setVehicleCount(resp.data[0].vehicle_count);
      }
    });

    // })
  }, [user.account_id]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  console.log(data);

  return (
    <Card className="px-2 rounded-sm min-h-full">
      {/* {JSON.stringify(user)} */}
      <Row>
        <CardHeader className="px-2 py-4 flex justify-between flex-row align-center item-center">
          <CardTitle>Vehicles List</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => navigate(`topup`)}>Top-Up Vehicle</Button>
            <Button
              onClick={() => navigate(`vehicleregistration/${user.account_id}`)}
            >
              Add Vehicle
            </Button>
          </div>
        </CardHeader>
        <Col md={12}>
          <Col md={12}>
            <Table className="p-2">
              <TableCaption className="pb-3">
                A list of your All Vehicles.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w">Vehicle ID</TableHead>
                  <TableHead>Chasis No</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Plate No
                  </TableHead>
                  <TableHead className="">Vehicle Make</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Balance
                  </TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.vehicle_id}
                    </TableCell>
                    <TableCell>{vehicle.chasis_no}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle.plate_no}
                    </TableCell>
                    <TableCell className="">{vehicle.vehicle_make}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vehicle.balance}
                    </TableCell>
                    <TableCell className="">
                      <Badge variant="outline"> {vehicle.status}</Badge>
                    </TableCell>
                    <TableCell className="">
                     <EditDialog />
                      <Button
                        onClick={() => {
                          navigate(
                            `/vehicleslist/licens-pdf/${vehicle.vehicle_id}`
                          );
                        }}
                        className="ml-2"
                      >
                        View License
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </Col>
        </Col>
      </Row>
    </Card>
  );
}

function EditDialog() {
    const _form = {
      owner_id: "",
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
const navigate = useNavigate();
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
  return (
    <Dialog className="text-black ">
      <DialogTrigger asChild>
        <Button>Edit </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[725px] md:max-h-[740px] sm:max-h-[400px] sm:max-w-[510px] sa text-black overflow-y-auto">
        <DialogHeader className="text-black">
          <DialogTitle>Edit Vehicle</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="">
          <div className="grid w-full items-center gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-2 pt-5 ">
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
                <span style={{ color: "red" }}>{errors.state_registered}</span>
              </FormFeedback>
            </div>
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
            <div className="flex flex-col space-y-0.5">
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
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

