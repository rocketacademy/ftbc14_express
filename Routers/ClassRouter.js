// app.use('/classes', classRouter.routes())

class ClassRouter {
  constructor(classController, express, auth) {
    this.controller = classController;
    this.express = express;
    this.auth = auth;
  }

  route = () => {
    // create classses table
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();
    router.get("/users", this.controller.listClassesUsers);
    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.auth.verify, this.controller.add);
    router.put("/:id", this.controller.edit);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = ClassRouter;
