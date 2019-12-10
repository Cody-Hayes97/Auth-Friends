import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { Button } from "reactstrap";

const handleClick = (e, props) => {
  e.preventDefault();
  localStorage.removeItem("token");
};

function App() {
  return (
    <Router>
      <div className="App">
        <h1
          style={{ marginTop: "2%", fontSize: "50px", fontFamily: "Lobster" }}
        >
          Auth Friends!
        </h1>
        <ul className="nav">
          <Link
            to="/login"
            style={{
              margin: "2%",
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "500"
            }}
          >
            Login
          </Link>

          <Link
            to="/hidden"
            style={{
              margin: "2%",
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "500"
            }}
          >
            Friends List
          </Link>
        </ul>
        <div className="routes-cont ">
          <Switch>
            <PrivateRoute exact path="/hidden" component={FriendsList} />
            <Route path="/login" component={Login} />
            <Route component={Login} />
          </Switch>
          <Button className="log-out-btn" onClick={handleClick}>
            Log out
          </Button>
        </div>
      </div>
    </Router>
  );
}

export default App;
