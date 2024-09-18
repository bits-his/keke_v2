import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { _post } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";
import toast from "react-hot-toast";
import InputField from "./InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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
    // e.preventDefault();

    // console.log(form);
    // setLoading(false);
    if (
      !form.Reporters_name ||
      !form.Reporters_phone_no ||
      !form.capacity ||
      !form.chasis_no ||
      !form.engine_no ||
      !form.vehicle_model ||
      !form.vehicle_color
    ) {
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
            console.log(res);
            //setSubmittedData([...submittedData, res]);
            navigate("/dashboard");
          }
        },
        () => {
          setLoading(false);
          console.log(err);
          toast.error("An error occurred while creating Vendor");
        }
      );
      setForm(_form);
    }
  };

  return (
    // <Card className="app_card dashboard_card shadow p-4 m-2 mt-2">
    //   <Row>
    //     <Col md={12}>
    //       <div
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //         }}
    //       >
    //         <button
    //           className="app_button"
    //           style={{
    //             width: "10rem",
    //             padding: 10,
    //             color: "#000",
    //             borderRadius: 10,
    //           }}
    //           onClick={() => navigate("/")}
    //         >
    //           Back
    //         </button>
    //         <h4 className="app_title vendor_title">Report stolen Vehicle</h4>
    //         <img
    //           src={keke}
    //           alt="Keke logo"
    //           style={{
    //             width: 40,
    //             height: 40,
    //             borderRadius: "50%",
    //             marginRight: 10,
    //           }}
    //         />
    //       </div>
    //       <hr />
    //     </Col>

    //     <Col md={12}>
    //       <Form className="mx-auto">
    //         <>
    //           <Row className="margin-bottom-input">
    //             <InputField
    //               id="rname"
    //               label="Owners name"
    //               name="owners_name"
    //               type="text"
    //               required="true"
    //               onChange={handleChange}
    //               place="John Doe"
    //             />
    //             <InputField
    //               id="phone"
    //               label="Phone No."
    //               name="owners_phone"
    //               type="number"
    //               required="true"
    //               handleChange={handleChange}
    //               place="080XXXXXXXXX"
    //             />
    //           </Row>
    //           <Row className="margin-bottom-input">
    //             <InputField
    //               id="engine_no"
    //               label="Engine No."
    //               name="engine_no"
    //               type="text"
    //               required="true"
    //               handleChange={handleChange}
    //               place=""
    //             />
    //             <InputField
    //               id="chasis_no"
    //               label="Chasis No."
    //               name="chasis_no"
    //               type="text"
    //               required="true"
    //               handleChange={handleChange}
    //               place=""
    //             />
    //           </Row>
    //           <Row className="margin-bottom-input">
    //             <InputField
    //               id="model"
    //               label="Vehicle Model"
    //               name="vehicle_model"
    //               type="text"
    //               required="true"
    //               handleChange={handleChange}
    //               place="TVS"
    //             />
    //             <InputField
    //               id="color"
    //               label="Vehicle color"
    //               name="color"
    //               type="text"
    //               required="true"
    //               handleChange={handleChange}
    //               place="yellow"
    //             />
    //           </Row>
    //           <Row className="margin-bottom-input">
    //             <InputField
    //               id="plate_no"
    //               label="plate Number"
    //               name="plate_no"
    //               type="text"
    //               required="true"
    //               handleChange={handleChange}
    //               place="200hp"
    //             />
    //             <InputField
    //               id="others"
    //               label="Other details"
    //               name="details"
    //               type="textarea"
    //               required="false"
    //               handleChange={handleChange}
    //               place=""
    //               rows={1}
    //             />
    //           </Row>
    //         </>
    //         <Row
    //           className="mt-3"
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             marginTop: 30,
    //           }}
    //         >
    //           <button
    //             className="app_button"
    //             style={{
    //               width: 130,
    //               marginLeft: 0,
    //               padding: 10,
    //               cursor: "pointer",
    //             }}
    //             disabled={loading}
    //             onClick={handleSubmit}
    //           >
    //             {loading ? <Spinner color="primary"></Spinner> : "Submit"}
    //           </button>
    //         </Row>
    //       </Form>
    //     </Col>
    //   </Row>
    // </Card>
    <>
      <Card className="w-">
        <CardHeader>
          <CardTitle className="text-center">Report Stolen</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full md:grid-cols-2 md:gap-8 lg:grid-cols-4items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Owners name</Label>
                <Input
                  id="name"
                  name="owners_name"
                  type="text"
                  required="true"
                  // value={form.owners_name}
                  onChange={handleChange}
                  place="John Doe"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone No.</Label>
                <Input
                  id="phone"
                  name="owners_phone"
                  type="number"
                  required="true"
                  onChange={handleChange}
                  place="080XXXXXXXXX"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Engine No.</Label>
                <Input
                  id="engine_no"
                  name="engine_no"
                  type="text"
                  required="true"
                  onChange={handleChange}
                  place=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Chasis No</Label>
                <Input
                  id="chasis_no"
                  name="chasis_no"
                  type="text"
                  required="true"
                  onChange={handleChange}
                  place=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Vehicle Model</Label>
                <Input
                  id="model"
                  name="vehicle_model"
                  type="text"
                  required="true"
                  onChange={handleChange}
                  place="TVS"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Vehicle color</Label>
                <Input
                  id="color"
                  name="color"
                  type="text"
                  required="true"
                  onChange={handleChange}
                  place="yellow"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">plate Number</Label>
                <Input
                  id="plate_no"
                  name="plate_no"
                  type="text"
                  required="true"
                  onChange={handleChange}
                  place="200hp"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Other details</Label>
                <Input
                  id="others"
                  name="details"
                  type="textarea"
                  required="false"
                  onChange={handleChange}
                  place=""
                />
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
