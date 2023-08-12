import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setToken }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    e.preventDefault();

    setLoginId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginId && password) {
      try {
        console.log(loginId, password);
        const loginResponse = await axios.post(
          `https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp`,
          { login_id: loginId, password: password }
        );
        setToken(loginResponse);
        navigate("/customer_list");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter credentials!");
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <Form className="login-form container" onSubmit={handleSubmit}>
          <Form.Group className="form-group mb-3" controlId="formBasicEmail">
            <Form.Label>Login Id</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Login Id"
              onChange={handleIdChange}
            />
          </Form.Group>

          <Form.Group className="form-group mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button
            className="text-center mx-auto"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
