class ClassController {
  constructor(classModel) {
    this.classModel = classModel;
  }

  list = async (req, res) => {
    console.log("LIST ME");
    try {
      console.log(this.classModel);
      const output = await this.classModel.findAll(); // return an array
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

      const output = await this.classModel.findByPk(id); // return an object
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    console.log("posting");
    try {
      await this.classModel.create({
        name: req.body.name,
        description: req.body.description,
        fullTime: req.body.fullTime,
        teacher: req.body.teacher,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.classModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  edit = async (req, res) => {
    const id = req.params.id;
    try {
      await this.classModel.update(
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

      const output = await this.classModel.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      await this.classModel.destroy({ where: { id: id } });

      const output = await this.classModel.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = ClassController;
