class StudentController {
  constructor(user, users_classes, classes) {
    this.user = user;
    this.usersClasses = users_classes;
    this.classes = classes;
  }

  list = async (req, res) => {
    console.log("LIST ME");
    try {
      console.log(this.user);
      const output = await this.user.findAll(); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  listOne = async (req, res) => {
    const id = req.params.id;
    try {
      // const output = await this.model.findAll({where : {
      //   id: id
      // }});

      const output = await this.user.findByPk(id); // return an object
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    console.log("posting");
    try {
      await this.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.user.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const id = req.params.id;
    try {
      await this.user.update(
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

      const output = await this.user.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      await this.user.destroy({ where: { id: id } });

      const output = await this.user.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getUserClasses = async (req, res) => {
    console.log("LIST users classes");
    try {
      console.log(this.user);
      const output = await this.usersClasses.findAll({
        include: [this.user, this.classes],
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addUserClass = async (req, res) => {
    try {
      console.log(this.user);
      await this.usersClasses.create({
        userId: req.body.userId,
        classId: req.body.classId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }); // return an array

      const output = await this.usersClasses.findAll({
        include: [this.user, this.classes],
      }); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = StudentController;
