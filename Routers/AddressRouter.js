// app.use('/addresses', addressRouter)

class AddressRouter {
  constructor(addressController, express, checkJWT) {
    this.controller = addressController;
    this.express = express;
    this.checkJWT = checkJWT;
  }

  route = () => {
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();
    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.checkJWT, this.controller.add);

    return router;
  };
}

module.exports = AddressRouter;
