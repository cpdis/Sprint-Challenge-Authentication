import React, { Component } from "react";

import { NavLink, Route } from "react-router-dom";

import Users from "./components/Users";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class App extends Component {
  signOut = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return <Container />;
  }
}

export default App;
