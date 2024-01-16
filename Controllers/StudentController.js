class StudentController {
  constructor() {
    this.students = [
      { name: "Jeremy", age: 25, course: "Farming" },
      { name: "Jessica", age: 26, course: "Sociology" },
    ];
  }

  list = (req, res) => {
    res.send(this.students);
  };

  listOne = (req, res) => {
    const student = this.students.filter(
      (student) => student.name == req.params.name
    );
    res.send(student);
  };

  add = (req, res) => {
    const newStudent = req.body;
    this.students.push(newStudent);
    res.send(this.students);
  };

  edit = (req, res) => {
    let editedData = req.body;
    let targetToUpdate = req.params.name;
    const arrayIndex = this.students.findIndex(
      (element) => element.name == targetToUpdate
    );
    this.students.splice(arrayIndex, 1, editedData);
    res.send(this.students);
  };

  delete = (req, res) => {
    let targetToUpdate = req.params.name;
    const arrayIndex = this.students.findIndex(
      (element) => element.name == targetToUpdate
    );
    this.students.splice(arrayIndex, 1);
    res.send(this.students);
  };
}

module.exports = StudentController;
