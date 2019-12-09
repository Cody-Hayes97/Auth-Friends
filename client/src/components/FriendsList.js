import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
      <h1>friendsList</h1>
      <input
        name="name"
        placeholder="Name"
        value={friend.name}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Age"
        value={friend.age}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={friend.email}
        onChange={handleChange}
      />
      <button onClick={postFriend}>Create New Friend</button>
      {/* <button onClick={getData}>click for friends</button> */}
      {data.map(bud => (
        <div key={bud.id} style={{ fontSize: "10px" }}>
          <h1>{bud.name}</h1>
          <h1>{bud.age}</h1>
          <h1>{bud.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
