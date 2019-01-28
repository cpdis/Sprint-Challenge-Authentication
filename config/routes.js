const axios = require("axios");
const bcrypt = require("bcryptjs");

const db = require("../database/dbConfig");

const { authenticate, generateToken } = require("../auth/authenticate");

const PORT = process.env.PORT || 3000;

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", getJokes);
  server.get("/", hello);
};

/**
 * REGISTER ENDPOINT
 *
 * Creates a user using the information sent inside the body of the request.
 * The password is hashed using bcrypt before saving the user to the database.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */

function register(req, res) {
  // Save login credentials from body of request
  const credentials = req.body;

  // Hash password using bcrypt
  const hash = bcrypt.hashSync(credentials.password, 15);
  credentials.password = hash;

  db("users")
    .insert(credentials)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
}

/**
 * LOGIN ENDPOINT
 *
 * Use the credentials sent inside the body to authenticate the user.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */

function login(req, res) {
  const credentials = req.body;

  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: "Logged in, Dad!", token });
      } else {
        res.status(401).json({ message: "Not now, Dad!" });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function hello(req, res) {
  res.send(`API running on port: ${PORT}`);
}
