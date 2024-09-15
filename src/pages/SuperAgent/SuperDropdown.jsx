import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { _get } from "../../lib/Helper";

function SuperDropdown({ handleChange, selectedSuperValue }) {
  const [data, setData] = useState([]);
  const [selectedSuper, setSelectedSuper] = useState(selectedSuperValue);
  const [loading, setLoading] = useState(false);

  const getSuper = useCallback(() => {
    setLoading(true);
    // _get(`superagent?query_type=select-all`, (resp) => {
    //   if (resp.success) {
    //     const formattedData = resp.data.map((superagent) => ({
    //       value: superagent.id,
    //       label: superagent.name,
    //     }));
    //     setData(formattedData);
    //     setLoading(false);
    //   } else {
    //     console.error("Failed to fetch super agents data");
    //     setLoading(false);
    //   }
    // });
    _get(`superagent?query_type=select-all`, (resp) => {
      if (resp.success && resp.results) {
        const formattedData = resp.results.map((superagent) => ({
          value: superagent.account_id,
          label: superagent.name,
        }));
        setData(formattedData);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getSuper();
  }, [getSuper]);

  const handleSelectChange = (selectedOption) => {
    setSelectedSuper(selectedOption);

    handleChange({
      target: {
        name: "super_agent_id",
        value: selectedOption ? selectedOption.value : "", // handle if no option is selected
      },
    });

    handleChange({
      target: {
        name: "superagent_name",
        value: selectedOption ? selectedOption.label : "", // handle if no option is selected
      },
    });
  };

  return (
    <Select
      value={selectedSuper}
      onChange={handleSelectChange}
      options={data}
      placeholder="Search for a super agent..."
      isLoading={loading}
    />
  );
}

export default SuperDropdown;
