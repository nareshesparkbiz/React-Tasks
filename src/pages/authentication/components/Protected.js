import React, { useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";

export const Protected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();

  useEffect(() => {
    let localData = localStorage.getItem("auth_token");

    if (!localData) {
      navigate("/login");
    }

    // for (let i in userData) {
    //   if (userData[i].status == true) {
    //     if (!userData[i].login) {
    //       navigate("/login");
    //     } else {
    //       navigate("/");
    //     }
    //     break;
    //   } else {
    //     navigate("/login");
    //   }
    // }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};
