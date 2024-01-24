// app.use('/addresses', addressRouter)

class AddressRouter {
  constructor(addressController, express) {
    this.controller = addressController;
    this.express = express;
  }

  route = () => {
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();
    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    return router;
  };
}

module.exports = AddressRouter;
