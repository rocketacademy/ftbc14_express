// app.use('/student', studentRouter)

class StudentRouter {
  constructor(studentController, express) {
    this.controller = studentController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.edit);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = StudentRouter;
