import React from "react";

export default function New() {
  return (
    <>
      <Row className="margin-bottom-input">
        <Col md={6} className="first-col">
          <FormGroup>
            <Label for="owners_name">Name</Label>
            <Input
              onChange={handleChange}
              id="owners_name"
              name="owners_name"
              value={form.owners_name}
              placeholder="Name of Vehicle owner"
              type="text"
              className="app_input"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="owners_phone">Phone</Label>
            <Input
              onChange={handleChange}
              id="owners_phone"
              name="owners_phone"
              value={form.owners_phone}
              placeholder="+234-8100000000"
              type="tel"
              className="app_input"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="margin-bottom-input">
        <Col md={6} className="first-col">
          <FormGroup>
            <Label for="owners_dob">Owners Date of Birth</Label>
            <Input
              onChange={handleChange}
              id="owners_dob"
              name="owners_dob"
              value={form.owners_dob}
              placeholder="Name of Vehicle owner"
              type="date"
              className="app_input"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="owners_next_of_kin">Next of kin</Label>
            <Input
              onChange={handleChange}
              id="owners_next_of_kin"
              name="owners_next_of_kin"
              value={form.owners_next_of_kin}
              placeholder="Next of kin"
              type="text"
              className="app_input"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="margin-bottom-input">
        <Col md={6} className="first-col">
          <FormGroup>
            <Label for="owners_address">Residential Address</Label>
            <Input
              onChange={handleChange}
              id="owners_address"
              name="owners_address"
              value={form.owners_address}
              type="text"
              className="app_input"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="owners_email">email</Label>
            <Input
              onChange={handleChange}
              id="owners_email"
              name="owners_email"
              value={form.owners_email}
              placeholder="owneranization@fake.com"
              type="email"
              className="app_input"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="margin-bottom-input">
        <Col md={6} className="first-col">
          <FormGroup>
            <Label for="owners_state">State of residence</Label>
            <Input
              onChange={handleChange}
              id="owners_state"
              name="owners_state"
              type="select"
              className="app_input"
              required
            >
              <option value={""}>Select State</option>
              {stateLga.map((item, idx) => (
                <option key={idx}>{item.state}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="owners_lga">LGA of residence</Label>
            <Input
              onChange={handleChange}
              id="owners_lga"
              name="owners_lga"
              type="select"
              className="app_input"
            >
              <option value={""}>--Select LGA--</option>
              {stateLga
                .filter((item) => item.state === form.owners_state)[0]
                ?.lgas?.map((lga, idx) => (
                  <option key={idx}>{lga}</option>
                ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="owners_nin">NIN</Label>
            <Input
              onChange={handleChange}
              name="owners_nin"
              id="owners_nin"
              value={form.owners_nin}
              type="number"
              className="app_input"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="tin">Password</Label>
            <Input
              onChange={handleChange}
              id="password"
              name="password"
              value={form.password}
              type="password"
              className="app_input"
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}
