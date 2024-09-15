import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { _get } from "../../lib/Helper";

function VendorDropdown({ handleChange, selectedVendorValue }) {
  const [data, setData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(selectedVendorValue);
  const [loading, setLoading] = useState(false);

  const getVendors = useCallback(() => {
    setLoading(true);
    _get(`vendors?query_type=select-all`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        // Extract only the name and id properties from the response
        const formattedData = resp.results.map((vendor) => ({
          value: vendor.account_id,
          label: vendor.name,
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
    handleChange({ target: { name: "vendor", value: selectedOption.value } });
  };

  return (
    <Select
      value={selectedVendor}
      onChange={handleSelectChange}
      options={data}
      placeholder="Search for a vendor..."
      styles={{
        borderRadius: "none !important",
        border: "1px solid #f5c005 !important",
        marginBottom: "15px",
        width: "100%",
        padding: "8px",
      }}
      isLoading={loading}
    />
  );
}

export default VendorDropdown;
