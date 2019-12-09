import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

const handleClick = (e, props) => {
  e.preventDefault();
  localStorage.removeItem("token");
};

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Auth Friends!</h1>

        <Link to="/login">Login</Link>

        <Link to="/hidden">Friends List</Link>

        <Switch>
          <PrivateRoute exact path="/hidden" component={FriendsList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
        <button onClick={handleClick}>Log out</button>
      </div>
    </Router>
  );
}

export default App;
