import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { _get } from "../../lib/Helper";

function VendorTopUpDropDown({ handleChange, selectedVendorValue }) {
  const [data, setData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(selectedVendorValue);
  const [loading, setLoading] = useState(false);

  const getVendors = useCallback(() => {
    setLoading(true); // Set loading to true before API call
    _get(`vendors?query_type=select-all`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        const formattedData = resp.results.map((vendor) => ({
          value: vendor.vendor_id,
          label: vendor.vendor_name,
        }));
        setData(formattedData);
      }
    });
  }, []);

  useEffect(() => {
    getVendors();
  }, [getVendors]);

  const handleSelectChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
    handleChange({
      target: {
        name: "vendor_id",
        value: selectedOption.value,
      },
    });
    handleChange({
      target: {
        name: "vendor_name",
        value: selectedOption.label,
      },
    });
  };

  return (
    <>
      <Select
        value={selectedVendor}
        onChange={handleSelectChange}
        options={data}
        placeholder="Search for a vendor..."
        styles={{
          borderRadius: "none !important",
          border: "1px solid #f5c005 !important",
          marginBottom: "15px",
          maxWidth: "100%",
          height: "30px",
          padding: "8px",
        }}
        isLoading={loading}
      />
    </>
  );
}

export default VendorTopUpDropDown;
