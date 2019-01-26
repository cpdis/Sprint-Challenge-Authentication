import React, { Component } from "react";

import { Route } from "react-router-dom";

import Nav from "./components/Nav";
import Jokes from "./components/Jokes";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import "./App.css";

class App extends Component {
  signOut = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </div>
    );
  }
}

export default App;
