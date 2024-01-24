class StudentController {
  constructor(user, usersAddress) {
    this.user = user;
    this.usersAddress = usersAddress;
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

  listAddresses = async (req, res) => {
    console.log("addresses");
    try {
      const output = await this.usersAddress.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  listOneAddress = async (req, res) => {
    try {
      const output = await this.usersAddress.findAll({
        where: {
          userId: req.params.id,
        },
        include: this.user,
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = StudentController;
