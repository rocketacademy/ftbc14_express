class BaseController {
  constructor(model) {
    this.model = model;
  }

  list = async (req, res) => {
    console.log("LIST ME");
    try {
      const output = await this.model.findAll(); // return an array
      console.log("output", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  listOne = async (req, res) => {
    const id = req.params.id;
    try {
      const output = await this.model.findByPk(id); // return an object
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

module.exports = BaseController;
