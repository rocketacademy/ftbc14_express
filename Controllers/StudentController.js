class StudentController {
  constructor(user, usersAddress) {
    (this.model = user), (this.userAddress = usersAddress);
  }

  list = async (req, res) => {
    try {
      const output = await this.model.findAll();
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

      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    try {
      await this.model.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    try {
      await this.model.update(
        {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { where: { id: id } }
      );

      const output = await this.model.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      await this.model.destroy({ where: { id: id } });

      const output = await this.model.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = StudentController;
