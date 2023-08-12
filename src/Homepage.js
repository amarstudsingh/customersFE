import React from "react";
import CustomerList from "./components/CustomerList";
import Login from "./components/Login";

function Homepage({ token, setToken }) {
  return (
    <>
      <div className="container">
        <Login setToken={setToken} />
      </div>
    </>
  );
}

export default Homepage;
