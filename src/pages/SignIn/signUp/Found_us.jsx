import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const PaymentForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Perform payment processing here
    // For demonstration purposes, let's assume payment is successful after 2 seconds
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div>
      <Button color="warning" block style={{ marginTop: '10px', marginBottom: '10px' }} onClick={toggleForm}>Pay</Button>
      {showForm && (
        <Form onSubmit={handlePayment}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" name="name" id="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input type="email" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
          </FormGroup>
          <Button type="submit" color="primary">Submit Payment</Button>
        </Form>
      )}
      {paymentSuccess && (
        <Alert color="success" style={{ marginTop: '10px' }}>
          Payment successful! Receipt will be generated shortly.
        </Alert>
      )}
    </div>
  );
};

export default PaymentForm;
