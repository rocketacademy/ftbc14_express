// ES6/7 syntax -- cannot be used in our express backends
// import React from 'react'
// import express from 'express'

// How I import in the backend, use require

const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./db/models/index");
const { users, users_addresses } = db;

console.log(db);

const StudentRouter = require("./Routers/StudentRouter");
const StudentController = require("./Controllers/StudentController");

const studentController = new StudentController(users, users_addresses);
const studentRouter = new StudentRouter(studentController, express);

// inbuilt middleware
// allows me to send JSON requests to my server - and use the body
app.use(express.json());

// allows me to send form requests to my server - and use the body
app.use(express.urlencoded({ extended: false }));

// Sam's custom middlware WOOOO
const myLoggingFunction = function (req, res, next) {
  console.log("The request url is:", req.url);
  console.log("The request body is:", req.body);
  console.log("The request param is:", req.params);

  next();
};

// setting up external middleware - allows Cross Origin Resource Sharing
app.use(cors());

// Applying Sams custom middleware
app.use(myLoggingFunction);

// we define a router and controller for each set of information that we have in the application
app.use("/students", studentRouter.route());

app.get("/", (request, response) => {
  // console.log(request);
  response.send("Hello FTBC14");
});

// Example of bad route handling for users - this would result in servers that are too long and not well formatted, use params instead.
// app.get("/students/Jessica", (request, response) => {
//   console.log(request);
//   console.log(request.params.name);
//   response.send(students[1]);
// });

// get information from the users and store in the db
app.post("/", (req, res) => {
  // handle a post request going to the '/' endpoint
});

// update information that is already stored in our db
app.put("/", (req, res) => {
  // handle a put request going to the '/' endpoint
});

// delete informatio that is already stored in our db
app.delete("/", (req, res) => {
  // handle a delete request going to the '/' endpoint
});

// Setup the port that we are getting the express app to listen to
app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
