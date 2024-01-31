// app.use('/students', studentRouter)

//http://localhost:8080/students/addresses

class StudentRouter {
  constructor(studentController, express, auth) {
    this.controller = studentController;
    this.express = express;
    this.auth = auth;
  }

  route = () => {
    // create classses table
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();

    router.get("/classes", this.controller.getUserClasses);
    router.post("/classes", this.auth.verify, this.controller.addUserClass);

    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.edit);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = StudentRouter;
