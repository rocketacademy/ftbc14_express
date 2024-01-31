const BaseController = require("./BaseController");

class ClassController extends BaseController {
  constructor(classes, users) {
    super(classes); // inherit from the base contorller
    this.usersModel = users;
  }

  // by default we inherit the list, listOne and delete method from the base controller

  add = async (req, res) => {
    console.log("posting");
    try {
      await this.model.create({
        name: req.body.name,
        description: req.body.description,
        fullTime: req.body.fullTime,
        teacher: req.body.teacher,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.model.findAll();
      console.log(output);
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
          name: req.body.name,
          description: req.body.description,
          fullTime: req.body.fullTime,
          teacher: req.body.teacher,
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

  listClassesUsers = async (req, res) => {
    console.log("LIST ME Classes");
    try {
      console.log(this.model);
      const output = await this.model.findAll({
        include: this.usersModel,
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = ClassController;
