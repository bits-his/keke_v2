import React, { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { _get, _post, separator } from "../../lib/Helper";
import VehicleDropDown from "./VehicleDropDown";
import AgentDropDown from "./AgentDropDown";
import { Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./vehicletopup.css";

function VehicleTopUp({ selectedAgentValue, selectedVehicleValue }) {
  const [data, setData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(selectedAgentValue);
  const [selectedVehicle, setSelectedVehicle] = useState(selectedVehicleValue);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // agent_id: "",
    // agent_name: "",
    // agent_balance: "",
    // vehicle_id: "",
    // plate_no: "",
    // chasis_no: "",
    // amount: "",
  });
  const navigate = useNavigate();
  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitTopUp = (e) => {
    // e.preventDefault();
    const obj = {
      source_id: form.agent_id,
      destination_id: form.vehicle_id,
      query_type: "top_up",
      type_of_top_up: "vehicle_top_up",
      out_type: "agent_top_up",
      ...form,
      // amount: parseFloat(form.amount),
    };
    toast.success(`Sucessfully added ${form.amount}`);
    setLoading(true);
    _post(`top-up/create`, obj, (res) => {
      if (res.success) {
        navigate("/vehicles"); /////////where?
      } else {
        setLoading(false);
        toast.error(`failed to top up vehicle`);
      }
    });

    //alert('please complete the form')
    //setLoading(false)
    //console.log(form);
  };

  //console.log(form)

  return (
    <>
      <div className="app_card dashboard_card m-0 p-0">
        <div style={{ margin: "auto" }}>
          <h3 className="text-center fw-bold ve-t-u">Vehicle Top-Up</h3>

          {/* {JSON.stringify(form)} */}
          {/* <div className="agent app_card " style={{ padding: "50px" }}> */}
          <div className="account-info row">
            <div className="info-input col-md-6">
              <h4 style={{ marginRight: "20px" }}> Select Agent:</h4>
              <AgentDropDown
                handleChange={handleChange}
                selectedAgentValue={form.agent_id}
              />
            </div>

            <div className="info-input col-md-6">
              <h4 style={{ marginRight: "57px" }}> Vehicle:</h4>
              <VehicleDropDown
                handleChange={handleChange}
                selectedVehicleValue={form.vehicle_id}
              />
            </div>
            <div className="info-input col-md-6 mx-auto mb-5">
              <h4>Amount:</h4>
              <input
                className="form-control"
                placeholder="Enter amount here..."
                onChange={handleChange}
                name="amount"
                value={form.amount}
                type="number"
              />
            </div>
            {/* </div> */}
          </div>
          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <div className="details">
              <p>
                FROM : <span>{form.agent_name}</span>
              </p>
              <p>
                ID : <span>{form.agent_id}</span>
              </p>
              <p>
                TO : <span>{form.Plate_no}</span>
              </p>
              <p>
                ID : <span>{form.vehicle_id}</span>
              </p>
              <p>
                Amount: <span>{form.amount ? separator(form.amount) : 0}</span>
              </p>
            </div>
          </div>

          <div className="top-up-submit">
            <Button onClick={submitTopUp} disabled={loading}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleTopUp;
