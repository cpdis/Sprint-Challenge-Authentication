import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 400px;
  margin: 0 100px;
  flex-direction: column;
`;

export default class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:3000/api/login";
    // const endpoint = "https://lambda-authentication.herokuapp.com/api/login";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.log("Error: ", err);
      });

    setTimeout(() => this.props.history.push("/jokes"), 3000);
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              label="Username"
              name="username"
              placeholder="your@email.com"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <input
              label="Password"
              name="password"
              placeholder="·····"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </Container>
    );
  }
}
