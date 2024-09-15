import React from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";

export default function CustomInput(props) {
  const {
    label = "",
    type = "",
    required = false,
    autoFocus = false,
    required1 = false,
  } = props;

  const primaryBorderStyle = {
    outline: "1.5px solid #F5C005",
    borderRadius: "0.25rem",
  };

  return (
    <Form.Group id="email" className="mb-4 ">
      <Form.Label>
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : ""}
      </Form.Label>
      <InputGroup>
        <Form.Control
          autoFocus={autoFocus}
          required={required1 ? required1 : required}
          type={type}
          style={primaryBorderStyle}
          {...props}
        />
        {props.children}
      </InputGroup>
    </Form.Group>
  );
}

export function customCard(props) {
  return <div></div>;
}
