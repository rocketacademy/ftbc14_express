const { Client } = require("pg");

const connectionConfiguration = {
  user: "samoshaughnessy",
  host: "localhost",
  database: "ftbc14",
  port: 5432,
};

const client = new Client(connectionConfiguration);

client.connect();

class StudentController {
  constructor() {
    this.students = [
      { name: "Jeremy", age: 25, course: "Farming" },
      { name: "Jessica", age: 26, course: "Sociology" },
    ];
  }

  list = (req, res) => {
    client.query("SELECT * FROM students;", (error, results) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log(results.rows);
        res.send(results.rows);
      }
    });

    // old list for array
    // res.send(this.students);
  };

  listOne = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM students WHERE id = ${id}`;

    const whenQueryDone = (error, results) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log(results.rows);
        res.send(results.rows);
      }
    };

    client.query(query, whenQueryDone);

    // const student = this.students.filter(
    //   (student) => student.name == req.params.name
    // );
    // res.send(student);
  };

  add = (req, res) => {
    console.log(req.body);
    let data = req.body;
    client.query(
      `INSERT INTO students (name, age, course, gender) VALUES ('${data.name}',${data.age},'${data.course}',${data.gender}) RETURNING *;`,
      (error, results) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log(results.rows);
          res.send(results.rows);
        }
      }
    );

    // const newStudent = req.body;
    // this.students.push(newStudent);
    // res.send(this.students);
  };

  edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    client.query(
      `UPDATE students SET name = '${data.name}', gender = ${data.gender}, age = ${data.age}, course = '${data.course}' WHERE id = ${id} RETURNING *;`,
      (error, results) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log(results.rows);
        }
      }
    );

    client.query("SELECT * FROM students;", (error, results) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log(results.rows);
        res.send(results.rows);
      }
    });

    // let editedData = req.body;
    // let targetToUpdate = req.params.name;
    // const arrayIndex = this.students.findIndex(
    //   (element) => element.name == targetToUpdate
    // );
    // this.students.splice(arrayIndex, 1, editedData);
    // res.send(this.students);
  };

  delete = (req, res) => {
    const id = req.params.id;
    client.query(
      `DELETE FROM students WHERE id = ${id} RETURNING *;`,
      (error, results) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          console.log(results.rows);
        }
      }
    );

    client.query("SELECT * FROM students;", (error, results) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log(results.rows);
        res.send(results.rows);
      }
    });

    // let targetToUpdate = req.params.name;
    // const arrayIndex = this.students.findIndex(
    //   (element) => element.name == targetToUpdate
    // );
    // this.students.splice(arrayIndex, 1);
    // res.send(this.students);
  };
}

module.exports = StudentController;
