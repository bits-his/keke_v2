import React, { useState, useCallback, useEffect } from "react";
import { _get } from "../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SuperDropdown from "../Component/SuperDropdown";
import VendorTopUpDropDown from "../Vendor/VendorTopUpDropDown";
import toast from "react-hot-toast";
import { _post, separator } from "../../lib/Helper";

function SuperAgentTopUp() {
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
    const obj = {
      source_id: form.vendor_id,
      destination_id: form.super_agent_id,
      query_type: "top_up",
      type_of_top_up: "super_agent_top_up",
      out_type: "vendor_top_up",
      ...form,
    };
    _post(
      "top-up/create",
      obj,
      (res) => {
        if (res.success) {
          setLoading(false); // Set loading to false when submission is successful
          toast.success("super agent top up created successfully");
          navigate("/superagenttable");
        }
      },
      (error) => {
        setLoading(false);
        toast.error(
          "An error occurred while creating super agent top up: " +
            error.message
        );
      }
    );
    // alert("HEEEEE")
    console.log(form);
  };

  return (
    <>
      {/* {JSON.stringify(form)} */}
      <div className="app_card dashboard_card m-0 p-0">
        <h3 className="text-center fw-bold">Super Agent Top-Up</h3>

        <div className="account-info row">
          {/* {JSON.stringify(form)} */}

          <div className="info-input col-md-6">
            <h4> Select Vendor:</h4>
            <VendorTopUpDropDown
              handleChange={handleChange}
              selectedVendorValue={form.vendor_id}
            />
          </div>
          <div className="info-input col-md-6">
            <h4> SuperAgent :</h4>
            <SuperDropdown
              handleChange={handleChange}
              selectedSuperValue={form.superagent_id}
            />
          </div>
          <div className="info-input col-md-6">
            <h4>Amount :</h4>
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
            <p>
              FROM : <span>{form.vendor_name}</span>
            </p>
            <p>
              TO : <span>{form.superagent_name}</span>
            </p>
            <p>
              ID : <span>{form.vendor_id}</span>
            </p>

            <p>
              ID : <span>{form.superagent_id}</span>
            </p>
            <p>
              Amount: <span>{form.amount ? separator(form.amount) : 0}</span>
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

export default SuperAgentTopUp;
