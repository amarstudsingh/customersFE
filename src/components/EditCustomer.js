import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Edit.css";

function EditCustomer({ token }) {
  const queryParameters = new URLSearchParams(window.location.search);
  const uuid = queryParameters.get("uuid");
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
  const [editStatus, setEditStatus] = useState(null);
  console.log(token, uuid);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(
        `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer&uuid=${uuid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCustomerData(data);
      } else {
        console.error("Failed to fetch customer data");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cmd: "update",
            uuid: uuid,
            ...customerData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        setEditStatus(data);
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="edit-customer-container">
      <h2>Edit Customer</h2>
      <Form className="edit-form container">
        <Form.Group className="form-group-container">
          <Form.Group className="form-group-edit" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={customerData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-edit" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={customerData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="form-group-container">
          <Form.Group className="form-group-edit" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={customerData.street}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-edit" controlId="address">
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
          <Form.Group className="form-group-edit" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={customerData.city}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-edit" controlId="state">
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
          <Form.Group className="form-group-edit" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="form-group-edit" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={customerData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form.Group>

        <Button variant="primary" onClick={handleEdit}>
          Update Customer
        </Button>
      </Form>

      {editStatus && <p>{editStatus}</p>}
    </div>
  );
}

export default EditCustomer;
