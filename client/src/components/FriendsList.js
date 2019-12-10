import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Input, Form, Button } from "reactstrap";

const FriendsList = () => {
  const [friend, setFriend] = useState({
    name: "",
    id: Date.now(),
    age: "",
    email: ""
  });

  const [data, setData] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    setFriend({
      ...friend,
      [e.target.name]: e.target.value
    });
  };

  const postFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/friends", friend)
      .then(res => {
        console.log(res);
        setFriend({
          name: "",
          age: "",
          email: ""
        });
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [friend]);

  return (
    <div>
      <h1>Friends List</h1>
      <div className="friends-cont">
        <Input
          style={{ width: "50%", marginBottom: "2%" }}
          name="name"
          placeholder="Name"
          value={friend.name}
          onChange={handleChange}
        />
        <Input
          style={{ width: "50%", marginBottom: "2%" }}
          name="age"
          placeholder="Age"
          value={friend.age}
          onChange={handleChange}
        />
        <Input
          style={{ width: "50%", marginBottom: "2%" }}
          name="email"
          placeholder="Email"
          value={friend.email}
          onChange={handleChange}
        />
      </div>
      <Button color="primary" onClick={postFriend}>
        Create New Friend
      </Button>
      {/* <button onClick={getData}>click for friends</button> */}
      {data.map(bud => (
        <div
          key={bud.id}
          style={{
            margin: "5% 0 5% 0",
            padding: "5% 0 5% 0"
          }}
        >
          <h1 style={{ fontSize: "20px" }}>{bud.name}</h1>
          <h1 style={{ fontSize: "20px" }}>{bud.age}</h1>
          <h1 style={{ fontSize: "20px" }}>{bud.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
