// app.use('/student', studentRouter)

class StudentRouter {
  constructor(studentController, express) {
    this.controller = studentController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.list);
    router.get("/:name", this.controller.listOne);
    router.post("/", this.controller.add);
    router.put("/:name", this.controller.edit);
    router.delete("/:name", this.controller.delete);

    return router;
  };
}

module.exports = StudentRouter;
