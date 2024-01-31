class AddressController {
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

  add = async (req, res) => {
    console.log("posting dd");
    try {
      await this.usersAddress.create({
        address: req.body.address,
        userId: req.body.userId,
        primaryAddress: req.body.primary,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.usersAddress.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = AddressController;
