import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stateLga } from "../../assets/stateLga";
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
import { _post } from "../../lib/Helper";
import { Loader2 } from "lucide-react";

export default function RegistrationTable() {
  const _form = {
    query_type: "insert",
    vendor_name: "",
    vendor_office_address: "",
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
    step: 0,
  };

  const [form, setForm] = useState(_form);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeSelect = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleNextStep = () => {
    if (form.step === 0) {
      if (
        !form.vendor_name ||
        !form.vendor_office_address ||
        !form.vendor_state ||
        !form.vendor_lga ||
        !form.vendor_phone ||
        !form.vendor_email
      ) {
        toast.error("Please fill in all Vendor fields.");
        return;
      }
    }
    setForm((p) => ({ ...p, step: p.step + 1 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);

    if (form.step === 1) {
      if (
        !form.contact_name ||
        !form.contact_address ||
        !form.contact_state ||
        !form.contact_lga ||
        !form.contact_phone ||
        !form.contact_email
      ) {
        toast.error("Please fill in all Contact fields.");
        return;
      }

      // Submit form (example logic)
      // setLoading(true);
      _post(
        "vendors/create",
        form,
        (res) => {
          if (res.success) {
            setLoading(false);
            toast.success("Vendor created successfully");
            setSubmittedData([...submittedData, res]);
            // navigate("/vendorReg");
          }
        },
        () => {
          setLoading(false);
          toast.error("An error occurred while creating Vendor");
        }
      );
    } else {
      handleNextStep();
    }
  };
  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.vendor_name.trim()) {
      newErrors.vendor_name = "Vendor Name must be filled";
    }
    if (!formData.vendor_phone.trim()) {
      newErrors.vendor_phone = "Vendor Phone Number must be filled";
    }
    if (!formData.vendor_email.trim()) {
      newErrors.vendor_email = "Vendor Email must be filled";
    }
    if (!formData.vendor_state.trim()) {
      newErrors.vendor_state = "Vendor State must be filled";
    }
    if (!formData.vendor_lga.trim()) {
      newErrors.vendor_lga = "Vendor L.G.A.  must be filled";
    }
    if (!formData.vendor_tin.trim()) {
      newErrors.vendor_office = "Vendor Address must be filled";
    }
    if (!formData.vendor_tin.trim()) {
      newErrors.vendor_tin = "Vendor TIN must be filled";
    }
    if (!formData.vendor_bn_rc.trim()) {
      newErrors.vendor_bn_rc = "Vendor must be filled";
    }
    if (!formData.contact_name.trim()) {
      newErrors.vendor_name = "contact Name must be filled";
    }
    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = "contact Phone Number must be filled";
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "contact Email must be filled";
    }
    if (!formData.contact_state.trim()) {
      newErrors.contact_state = "contact State must be filled";
    }
    if (!formData.contact_lga.trim()) {
      newErrors.contact_lga = "contact L.G.A.  must be filled";
    }
    if (!formData.contact_tin.trim()) {
      newErrors.contact_office_address = "contact Address must be filled";
    }

    return newErrors;
  };
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="flex flex-row justify-center">
          <span className="p-6 mr-auto">
            <Button onClick={() => navigate("/vendors")}>Back</Button>
          </span>
          <CardHeader className=" flex-row">
            <CardTitle className="text-center ">
              {" "}
              {form.step === 0
                ? "Vendor Registration"
                : "Vendor Contact Information"}
            </CardTitle>
          </CardHeader>
        </div>
        {/* <CardTitle className="text-center">
          {form.step === 0
            ? "Vendor Registration"
            : "Vendor Contact Information"}
        </CardTitle> */}
      </CardHeader>
      <CardContent>
        <form className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.step === 0 ? (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label>Vendor's Name *</Label>
                  <Input
                    onChange={handleChange}
                    value={form.vendor_name}
                    placeholder="Vendor Name"
                    required
                    id="vendor_name"
                    name="vendor_name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label for="vendor_phone">
                    Organization's phone <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    onChange={handleChange}
                    id="vendor_phone"
                    name="vendor_phone"
                    value={form.vendor_phone}
                    placeholder="+234-8100000000"
                    type="tel"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Office Address *</Label>
                  <Input
                    onChange={handleChange}
                    id="vendor_office_address"
                    name="vendor_office_address"
                    value={form.vendor_office_address}
                    placeholder="Vendor Address"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label for="vendor_email">
                    Organization's email <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    onChange={handleChange}
                    id="vendor_email"
                    name="vendor_email"
                    value={form.vendor_email}
                    placeholder="organization@fake.com"
                    type="email"
                    className="app_input"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>State *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleChangeSelect("vendor_state", value)
                    }
                    value={form.vendor_state}
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
                    onValueChange={(value) =>
                      handleChangeSelect("vendor_lga", value)
                    }
                    value={form.vendor_lga}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                    <SelectContent>
                      {stateLga
                        .find((item) => item.state === form.vendor_state)
                        ?.lgas.map((lga, idx) => (
                          <SelectItem key={idx} value={lga}>
                            {lga}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label for="tin">TIN</Label>
                  <Input
                    onChange={handleChange}
                    id="vendor_tin"
                    name="vendor_tin"
                    value={form.vendor_tin}
                    type="number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label for="vendor_bn_rc">BN/RC</Label>
                  <Input
                    onChange={handleChange}
                    id="vendor_bn_rc"
                    name="vendor_bn_rc"
                    value={form.vendor_bn_rc}
                    type="text"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Name *</Label>
                  <Input
                    onChange={handleChange}
                    id="contact_name"
                    name="contact_name"
                    value={form.contact_name}
                    placeholder="Contact Name"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Phone *</Label>
                  <Input
                    onChange={handleChange}
                    id="contact_phone"
                    name="contact_phone"
                    value={form.contact_phone}
                    placeholder="+234-8100000000"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Address *</Label>
                  <Input
                    onChange={handleChange}
                    id="contact_address"
                    name="contact_address"
                    value={form.contact_address}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Email *</Label>
                  <Input
                    onChange={handleChange}
                    value={form.contact_email}
                    placeholder="contact@fake.com"
                    name="contact_email"
                    id="contact_email"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>State *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleChangeSelect("contact_state", value)
                    }
                    value={form.contact_state}
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
                    onValueChange={(value) =>
                      handleChangeSelect("contact_lga", value)
                    }
                    value={form.contact_lga}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                    <SelectContent>
                      {stateLga
                        .find((item) => item.state === form.contact_state)
                        ?.lgas.map((lga, idx) => (
                          <SelectItem key={idx} value={lga}>
                            {lga}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter>
        {form.step > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setForm((p) => ({ ...p, step: 0 }))}>
              Prev
            </Button>

            <Button type="submit" onClick={handleSubmit}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        ) : (
          <Button
            className="float-right"
            type="submit"
            onClick={handleNextStep}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Next"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
