import React, { useState } from "react";
import axios from "axios";
import { Input, Form, Button } from "reactstrap";

const Login = props => {
  const [login, setLogin] = useState({
    credentials: {
      username: "",
      password: "",
      isLoading: false
    }
  });

  const handleChange = e => {
    setLogin({
      credentials: {
        ...login.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({
      credentials: {
        isLoading: true
      }
    });
    axios
      .post("http://localhost:5000/api/login", login.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        setLogin({
          credentials: {
            isLoading: false
          }
        });
        props.history.push("/hidden");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  if (login.credentials.isLoading === true) {
    return <h1>loading</h1>;
  } else {
    return (
      <div>
        <h1>Enter your Info Below</h1>
        <div className="login-cont">
          <form onSubmit={handleSubmit}>
            <Input
              style={{ width: "50%", marginBottom: "2%" }}
              name="username"
              type="text"
              placeholder="Username"
              value={login.credentials.username}
              onChange={handleChange}
            />
            <Input
              style={{ width: "50%", marginBottom: "2%" }}
              name="password"
              type="text"
              placeholder="Password"
              value={login.credentials.password}
              onChange={handleChange}
            />
            <Button color="primary" style={{ marginRight: "6%" }}>
              Log In
            </Button>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
