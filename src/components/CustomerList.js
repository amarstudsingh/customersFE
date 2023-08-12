import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "react-bootstrap/esm/Button";

function CustomerList({ token }) {
  const [customerData, setCustomerData] = useState([
    {
      first_name: "Jane",
      last_name: "Doe",
      street: "Elvnu Street",
      address: "H no 2 ",
      city: "Delhi",
      state: "Delhi",
      email: "sam@gmail.com",
      phone: "12345678",
    },
  ]);
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    fetchCustomerData();
  }, [token]);

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list",
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

  const handleDelete = async (uuid) => {
    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            cmd: "delete",
            uuid: uuid,
          }).toString(),
        }
      );

      if (response.ok) {
        const data = await response.text();
        setDeleteStatus(data);
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <i
                  class="bi bi-trash3"
                  style={{ color: "red", padding: "10px" }}
                  onClick={() => handleDelete(customer.uuid)}
                />
                <Link
                  to={`/edit?uuid=${customer.uuid}`}
                  className="bi bi-pencil"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary">
        <Link style={{ color: "white", textDecoration: "none" }} to={`/create`}>
          Add Customer
        </Link>
      </Button>
    </div>
  );
}

export default CustomerList;
