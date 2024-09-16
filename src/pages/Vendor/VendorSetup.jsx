import React, { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import VendorTopUpDropDown from "../Vendor/VendorTopUpDropDown";
import { _get, _post, separator } from "../../lib/Helper";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import PaymentType from "../Component/PaymentType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function VendorSetup({ selectedVendorValue }) {
  const [data, setData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(selectedVendorValue);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vendor_id: "",
    vendor_name: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRangeChange = (e) => {
    setForm({ ...form, rangeValue: e.target.value });
  };

  const getVendors = useCallback(() => {
    setLoading(true);
    _get(`vendors?query_type=select-all`, (resp) => {
      setLoading(false);
      if (resp.success && resp.result) {
        const formattedData = resp.result.map((vendor) => ({
          value: vendor.id,
          label: vendor.vendor_name,
        }));
        setData(formattedData);
      }
    });
  }, []);

  useEffect(() => {
    getVendors();
  }, [getVendors]);

  const handleSelectVendorChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
    handleSelectVendorChange({
      target: { name: "vendor", value: selectedOption.value },
    });
  };

  const submitTopUp = () => {
    // e.preventDefault();
    const obj = {
      source_id: 0,
      destination_id: form.vendor_id,
      query_type: "vendor_top_up",
      type_of_top_up: "vendor_top_up",
      ...form,
    };
    _post(
      "top-up/create",
      obj,
      (res) => {
        if (res.success) {
          setLoading(false);
          toast.success("vendor top_up successfully");
          navigate("/vendorReg");
        }
      },
      (err) => {
        console.log(err);
        toast.error("Error occoured while creating top up ");
        setLoading(false);
      }
    );

    if (form.amount <= 0) {
      toast.error("Amount should be above 100.");
      return;
    }

    //console.log(form);
  };

  return (
    <>
      <Card>
        <CardHeader className="p-0">
          <div className="flex flex-row justify-center">
            <span className="p-6 mr-auto">
              <Button onClick={() => navigate("/vendors")}>Back</Button>
            </span>
            <CardHeader className=" flex-row">
              <CardTitle className="text-center ">Vendor Setup</CardTitle>
              {/* <CardDescription>create new user</CardDescription> */}
            </CardHeader>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ margin: "auto" }}>
            <div className="account-info row">
              <div className="info-input col-md-6">
                <div style={{ marginTop: "15px" }}>
                  <h4> Select Vendor:</h4>
                  <VendorTopUpDropDown
                    handleChange={handleChange}
                    selectedVendorValue={form.vendor_id}
                  />
                </div>
              </div>

              <div className="info-input col-md-6">
                <div style={{ marginTop: "15px" }}>
                  <h4> Payment Type:</h4>
                  <PaymentType
                    handleChange={handleChange}
                    paymentValue={form.payment_value}
                  />
                </div>
              </div>

              <div>
                <div className="info-input col-md-6">
                  <h4>
                    {form.payment_value === "percentage"
                      ? `Percentage (${
                          form.percentValue ? form.percentValue : 0
                        })`
                      : `Amount (${
                          form.amount ? separator(form.amount) : 0
                        })`}{" "}
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
                        const value = Math.max(
                          1,
                          Math.min(100, e.target.value)
                        );
                        handleChange({
                          target: { name: e.target.name, value },
                        });
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
            </div>
            <div className="transaction-details">
              <h3>Setup Details</h3>
              <div className="details">
                <div className="full-width">
                  <p>
                    VENDOR NAME: <span>{form.vendor_name}</span>
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
              {/* <Button onClick={submitTopUp}>Submit</Button> */}
              <Button onClick={submitTopUp}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default VendorSetup;
