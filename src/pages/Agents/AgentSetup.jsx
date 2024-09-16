import React, { useState, useCallback, useEffect } from "react";
import { _get, _post, separator } from "../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SuperDropdown from "../Component/SuperDropdown";
import AgentDropDown from "../vehicleOwner/AgentDropDown";
import toast from "react-hot-toast";
import PaymentType from "../Component/PaymentType";

function AgentSetup() {
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
    // const obj = {
    //   source_id: form.super_agent_id,
    //   destination_id: form.agent_id,
    //   query_type: "top_up",
    //   type_of_top_up: "agent_top_up",
    //   out_type: "super_agent_top_up",
    //   ...form,
    // };
    // _post(
    //   "top-up/create",
    //   obj,
    //   (res) => {
    //     setLoading(false); // Set loading to false when submission is successful
    //     if (res.success) {
    //       toast.success("agent top up created successfully");
    //       // setSubmittedData([...submittedData, res]);
    //       navigate("/agenttable");
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     toast.error("An error occurred while creating agent top up");
    //     setLoading(false);
    //   }
    // );
    console.log(form);
  };

  return (
    <>
      {/* {JSON.stringify(form)} */}
      <div className="app_card dashboard_card m-0 p-0">
        <h3 className="text-center fw-bold">Agent Top-Up</h3>

        <div>
          <div className="account-info row">
            <div className="info-input col-md-6">
              <h4>Agent :</h4>
              <AgentDropDown
                handleChange={handleChange}
                selectedAgentValue={form.agent_id}
              />
            </div>
            <div className="info-input col-md-6">
              <h4> Payment Type:</h4>
              <PaymentType
                handleChange={handleChange}
                paymentValue={form.payment_value}
              />
            </div>
            <div className="info-input col-md-6">
              <h4>
                {form.payment_value === "percentage"
                  ? `Percentage (${form.percentValue ? form.percentValue : 0})`
                  : `Amount (${form.amount ? separator(form.amount) : 0})`}{" "}
                :
              </h4>
              {form.payment_value === "percentage" ? (
                <input
                  placeholder="Enter percentage here..."
                  type="number"
                  name="percentValue"
                  value={form.percentValue}
                  min="1"
                  max="100"
                  onChange={(e) => {
                    const value = Math.max(1, Math.min(100, e.target.value));
                    handleChange({ target: { name: e.target.name, value } });
                  }}
                  style={{
                    width: "100%",
                    borderColor: "#dedede",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid",
                  }}
                />
              ) : (
                <input
                  placeholder="Enter amount here..."
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    borderColor: "#dedede",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid",
                  }}
                />
              )}
            </div>
          </div>

          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <div className="details">
              <div className="full-width">
                <p>
                  Agent: <span>{form.agent_name}</span>
                </p>
              </div>
              <div className="full-width">
                <p>
                  Payment Type: <span>{form.payment_value}</span>
                </p>
                <p>
                  {form.payment_value === "percentage"
                    ? `PERCENTAGE: ${
                        form.percentValue ? form.percentValue : 0
                      }%`
                    : `AMOUNT: ${form.amount ? separator(form.amount) : 0} `}
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

export default AgentSetup;
