import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import EditCustomer from "./components/EditCustomer";
import Homepage from "./Homepage";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Homepage token={token} setToken={setToken} />}
            />

            <Route
              path="/customer_list"
              element={<CustomerList token={token} />}
            >
              {/* {token ? (
                <CustomerList token={token} />
              ) : (
                "Please login to access."
              )} */}
            </Route>

            <Route path="/edit" element={<EditCustomer token={token} />}>
              {/* {token ? (
                <EditCustomer token={token} />
              ) : (
                "Please login to access."
              )} */}
            </Route>

            <Route path="/create" element={<AddCustomer token={token} />}>
              {/* {token ? (
                <AddCustomer token={token} />
              ) : (
                "Please login to access."
              )} */}
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
