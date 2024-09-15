import React, { useState, useCallback, useEffect } from "react";
import { _get } from "../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SuperDropdown from "./SuperDropdown";
import VendorTopUpDropDown from "../Vendor/VendorTopUpDropDown";
import toast from "react-hot-toast";
import { _post, separator } from "../../lib/Helper";
import PaymentType from "../Component/PaymentType";

function SuperAgentSetup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitTopUp = () => {
    // e.preventDefault();
    // const obj = {
    //   source_id: form.vendor_id,
    //   destination_id: form.super_agent_id,
    //   query_type: "top_up",
    //   type_of_top_up: "super_agent_top_up",
    //   out_type: "vendor_top_up",
    //   ...form,
    // };
    // _post(
    //   "top-up/create",
    //   obj,
    //   (res) => {
    //     if (res.success) {
    //       setLoading(false);
    //       toast.success("super agent top up created successfully");
    //       navigate("/superagenttable");
    //     }
    //   },
    //   (error) => {
    //     setLoading(false);
    //     toast.error(
    //       "An error occurred while creating super agent top up: " +
    //         error.message
    //     );
    //   }
    // );

    console.log(form);
  };

  return (
    <>
      {/* {JSON.stringify(form)} */}
      <div className="app_card dashboard_card m-0 p-0">
        <h3 className="text-center fw-bold">Super Agent Setup</h3>

        <div className="account-info row">
          {/* {JSON.stringify(form)} */}
          <div className="info-input col-md-6">
            <h4> SuperAgent :</h4>
            <SuperDropdown
              handleChange={handleChange}
              selectedSuperValue={form.superagent_id}
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
            <p>
              Super Agent : <span>{form.superagent_name}</span>
            </p>
            <p>
              Payment Type : <span>{form.payment_value}</span>
            </p>

            <p>
              {form.payment_value === "percentage"
                ? `PERCENTAGE: ${form.percentValue ? form.percentValue : 0}%`
                : `AMOUNT: ${form.amount ? separator(form.amount) : 0} `}
            </p>
          </div>
        </div>
        <div className="top-up-submit">
          <Button onClick={submitTopUp}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default SuperAgentSetup;
