import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Add.css";

function AddCustomer({ token }) {
  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });
  const [createStatus, setCreateStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      if (!customerData.first_name || !customerData.last_name) {
        setCreateStatus("First Name and Last Name are mandatory.");
        return;
      }

      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cmd: "create",
            ...customerData,
          }),
        }
      );

      if (response.status === 201) {
        setCreateStatus("Successfully Created");
      } else {
        setCreateStatus("Failed to create customer");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      setCreateStatus("An error occurred while creating customer.");
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Create Customer</h2>
      <Form className="add-form container">
        <Form.Group className="form-group-container">
          <Form.Group className="form-group-add" controlId="first_name">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={customerData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-add" controlId="last_name">
            <Form.Label>Last Name*</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={customerData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="form-group-container">
          <Form.Group className="form-group-add" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={customerData.street}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-add" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={customerData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="form-group-container">
          <Form.Group className="form-group-add" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={customerData.city}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-add" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={customerData.state}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="form-group-container">
          <Form.Group className="form-group-add" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-add" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={customerData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Button variant="primary" onClick={handleCreate}>
          Create Customer
        </Button>
      </Form>

      {createStatus && <p>{createStatus}</p>}
    </div>
  );
}

export default AddCustomer;
