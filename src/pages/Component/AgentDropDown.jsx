import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { _get } from "../../lib/Helper";

function AgentDropDown({ handleChange, selectedAgentValue }) {
  const [data, setData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(selectedAgentValue);
  const [loading, setLoading] = useState(false);

  const getAgents = useCallback(() => {
    setLoading(true);
    _get(`agents?query_type=select-all`, (resp) => {
      setLoading(false);
      if (resp.success && resp.results) {
        // Extract only the name and id properties from the response
        const formattedData = resp.results.map((agent) => ({
          value: agent.account,
          label: agent.name,
        }));
        setData(formattedData);
      }
    });
  }, []);

  useEffect(() => {
    getAgents();
  }, [getAgents]);
  // const handleSelectChange = (selectedOption) => {
  //   setSelectedAgent(selectedOption);
  //   handleChange({ target: { name: selectedOption.name, value: selectedOption.value } });
  // };
  // const handleSelectChange = (selectedOption) => {
  //   setSelectedAgent(selectedOption);
  //   console.log(selectedOption);
  //   handleChange({
  //     target: {
  //       name: "agent_name",
  //       value: selectedOption.label,
  //     },
  //     target: {
  //       name: "agent_id",
  //       value: selectedOption.value,
  //     },
  //   });
  // };
  const handleSelectChange = (selectedOption) => {
    setSelectedAgent(selectedOption);
    handleChange({
      target: {
        name: "agent_id",
        value: selectedOption.value,
      },
    });
    handleChange({
      target: {
        name: "agent_name",
        value: selectedOption.label,
      },
    });
  };

  return (
    <Select
      value={selectedAgent}
      onChange={handleSelectChange}
      options={data}
      placeholder="Search for an agent..."
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

export default AgentDropDown;
