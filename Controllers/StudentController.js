const BaseController = require("./BaseController");

class StudentController extends BaseController {
  constructor(model, usersClasses, classes, usersAddresses) {
    super(model); // inherirt from the base contorller
    this.usersClasses = usersClasses;
    this.classes = classes;
    this.usersAddresses = usersAddresses;
  }

  // by default we inherit the list, listOne and delete method from the base controller

  // overwrites the inherited List method
  list = async (req, res) => {
    console.log("LIST ME");
    try {
      const output = await this.model.findAll({
        include: [this.usersAddresses],
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    console.log("posting");
    try {
      await this.model.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const id = req.params.id;
    try {
      await this.model.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { where: { id: id } }
      );

      const output = await this.model.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getUserClasses = async (req, res) => {
    console.log("LIST users classes");
    try {
      console.log(this.model);
      const output = await this.usersClasses.findAll({
        include: [this.model, this.classes],
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addUserClass = async (req, res) => {
    try {
      console.log(this.model);
      await this.usersClasses.create({
        userId: req.body.userId,
        classId: req.body.classId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }); // return an array

      const output = await this.usersClasses.findAll({
        include: [this.model, this.classes],
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = StudentController;
