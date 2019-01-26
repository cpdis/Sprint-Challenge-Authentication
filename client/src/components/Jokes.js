import React, { Component } from "react";
import axios from "axios";

export default class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:3000/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get(endpoint, options)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }
  render() {
    return (
      <div>
        <h2>Dad Jokes!</h2>
        <ul>
          {this.state.jokes.map(jokey => (
            <li key={jokey.id}>{jokey.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}
