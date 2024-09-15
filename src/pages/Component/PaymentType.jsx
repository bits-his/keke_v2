import React, { useState } from "react";
import Select from "react-select";

export default function PaymentType({ handleChange, paymentValue }) {
  const [PaymentType, setPaymentType] = useState(paymentValue);

  const options = [
    { label: "Fixed", value: "fixed" },
    { label: "Percentage", value: "percentage" },
  ];

  const handleSelectChange = (selectedOption) => {
    setPaymentType(selectedOption);
    handleChange({
      target: {
        name: "payment_value",
        value: selectedOption.value,
      },
    });
  };

  return (
    <>
      <Select
        value={PaymentType}
        onChange={handleSelectChange}
        options={options}
        placeholder="Select a payment type..."
        styles={{
          borderRadius: "none !important",
          border: "1px solid #f5c005 !important",
          marginBottom: "15px",
          maxWidth: "100%",
          height: "30px",
          padding: "8px",
        }}
      />
    </>
  );
}
