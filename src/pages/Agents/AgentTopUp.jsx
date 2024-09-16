import React, { useState, useCallback, useEffect } from "react";
import { _get, _post, separator } from "../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SuperAgentDropdown from "../Component/SuperAgentDropdown";
import AgentDropDown from "../Component/AgentDropDown";
import toast from "react-hot-toast";

function AgentTopUp() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
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
      source_id: form.super_agent_id,
      destination_id: form.agent_id,
      query_type: "top_up",
      type_of_top_up: "agent_top_up",
      out_type: "super_agent_top_up",
      ...form,
    };
    _post(
      "top-up/create",
      obj,
      (res) => {
        setLoading(false); // Set loading to false when submission is successful
        if (res.success) {
          toast.success("agent top up created successfully");
          // setSubmittedData([...submittedData, res]);
          navigate("/agenttable");
        }
      },
      (err) => {
        console.log(err);
        toast.error("An error occurred while creating agent top up");
        setLoading(false);
      }
    );
  };

  return (
    <>
      {/* {JSON.stringify(form)} */}
      <div className="app_card dashboard_card m-0 p-0">
        <h3 className="text-center fw-bold">Agent Top-Up</h3>

        <div>
          <div className="account-info row">
            <div className="info-input col-md-6">
              <h4>SuperAgent :</h4>
              <SuperAgentDropdown
                handleChange={handleChange}
                selectedSuperValue={form.super_agent_id}
              />
            </div>
            <div className="info-input col-md-6">
              <h4> Select Agent:</h4>
              <AgentDropDown
                handleChange={handleChange}
                selectedAgentValue={form.agent_id}
              />
            </div>
            <div className="info-input col-md-6">
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
          </div>

          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <div className="details">
              <div className="full-width">
                <p>
                  AGENT NAME: <span>{form.agent_name}</span>
                </p>
              </div>
              <div className="full-width">
                <p>
                  AGENT ID: <span>{form.super_agent_id}</span>
                </p>
                <p>
                  AMOUNT:{" "}
                  <span>{form.amount ? separator(form.amount) : 0}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="top-up-submit">
            <Button onClick={submitTopUp}>Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentTopUp;
