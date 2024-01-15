// ES6/7 syntax -- cannot be used in our express backends
// import React from 'react'
// import express from 'express'

// How I import in the backend, use require

const express = require("express");
const app = express();
const cors = require("cors");

// handle simple get request '/'
// crud
// create - read - update -delete

const students = [
  { name: "Jeremy", age: 25, course: "Farming" },
  { name: "Jessica", age: 26, course: "Sociology" },
];

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

app.get("/", (request, response) => {
  // console.log(request);
  response.send("Hello FTBC14");
});

app.get("/students/", (request, response) => {
  // console.log(request);
  response.send(students);
});

// second students/ route handler will never run, as that route is handled by the code above.
// app.get("/students/", (request, response) => {
//   // console.log(request);
//   response.send("Noooo");
// });

app.get("/students/:name", (request, response) => {
  // console.log(request);
  // console.log(request.params.name);
  const student = students.filter(
    (student) => student.name == request.params.name
  );
  response.send(student);
});

// add a new student into out student array
app.post("/students", (request, response) => {
  // console.log(request);
  // console.log(request.body);

  const newStudent = request.body;

  students.push(newStudent);

  response.send(students);
});

app.put("/students/:name", (request, response) => {
  let editedData = request.body;
  let targetToUpdate = request.params.name;
  const arrayIndex = students.findIndex(
    (element) => element.name == targetToUpdate
  );
  students.splice(arrayIndex, 1, editedData);
  response.send(students);
});

app.delete("/students/:name", (request, response) => {
  let targetToUpdate = request.params.name;
  const arrayIndex = students.findIndex(
    (element) => element.name == targetToUpdate
  );
  students.splice(arrayIndex, 1);
  response.send(students);
});

// Extra challenges / exercises
// add a new request handler to edit a student from the student array

// add a new request handler to delete a student from the student array

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
