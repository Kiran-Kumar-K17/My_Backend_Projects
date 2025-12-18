import UserInput from "./UserInput";
import user from "./user.png";
import robot from "./robot.png";
import React from "react";

const UserResponse = (props) => {
  const { message, sender } = props;

  return (
    <div className={`message ${sender}`}>
      <img
        src={sender === "user" ? user : robot}
        className="avatar"
        alt={sender}
      />
      <div className="bubble">{message}</div>
    </div>
  );
};

export default UserResponse;
