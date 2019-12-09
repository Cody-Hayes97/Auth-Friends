import React, { useState } from "react";
import axios from "axios";

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
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={login.credentials.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="text"
            placeholder="Password"
            value={login.credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
};

export default Login;
