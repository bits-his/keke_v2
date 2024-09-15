import React from "react";

export default function Driver() {
  return (
    <div>
      <>
        <Row className="margin-bottom-input">
          <Row>
            {/* <Col md={9}>
												<h4 className='text-center'>If the vehicle owner is the Driver click <span onClick={handleCopyOwner} className='btn btn-sm inline btn-primary' style={{ display: 'inline' }}>Here</span></h4>
											</Col> */}
          </Row>
          <Col md={6} className="first-col">
            <FormGroup>
              <Label for="driver_name">Driver Name</Label>
              <Input
                onChange={handleChange}
                id="Name"
                name="driver_name"
                value={form.driver_name}
                placeholder="Name of Vehicle driver"
                type="text"
                className="app_input"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="driver_phone">Phone</Label>
              <Input
                onChange={handleChange}
                id="driver_phone"
                name="driver_phone"
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
              <Label for="driver_address">Residential Address</Label>
              <Input
                onChange={handleChange}
                id="driver_address"
                name="driver_address"
                type="text"
                className="app_input"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="driver_email">email</Label>
              <Input
                onChange={handleChange}
                id="driver_emailexample"
                name="driver_email"
                value={form.driver_email}
                placeholder="driveranization@fake.com"
                type="email"
                className="app_input"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="margin-bottom-input">
          <Col md={6} className="first-col">
            <FormGroup>
              <Label for="driver_state">State of residence</Label>
              <Input
                onChange={handleChange}
                id="driver_state"
                name="driver_state"
                value={form.driver_state}
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
              <Label for="driver_lga">LGA of residence</Label>
              <Input
                onChange={handleChange}
                id="driver_lga"
                name="driver_lga"
                value={form.driver_lga}
                type="select"
                className="app_input"
              >
                <option value={""}>--Select LGA--</option>
                {stateLga
                  .filter((item) => item.state === form.driver_state)[0]
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
              <Label for="driver_nin">NIN</Label>
              <Input
                onChange={handleChange}
                id="driver_nin"
                name="driver_nin"
                value={form.driver_nin}
                type="number"
                className="app_input"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="driver_dob">D.O.B</Label>
              <Input
                onChange={handleChange}
                id="driver_dob"
                name="driver_dob"
                value={form.driver_dob}
                type="date"
                className="app_input"
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    </div>
  );
}
