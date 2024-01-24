class StudentController {
  constructor(usersAddress, user) {
    this.usersAddress = usersAddress;
    this.user = user;
  }

  list = async (req, res) => {
    try {
      const output = await this.usersAddress.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  listOne = async (req, res) => {
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
