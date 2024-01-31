// app.use('/addresses', addressRouter)

class AddressRouter {
  constructor(addressController, express, auth) {
    this.controller = addressController;
    this.express = express;
    this.auth = auth;
  }

  route = () => {
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();
    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.auth.verify, this.controller.add);

    return router;
  };
}

module.exports = AddressRouter;
