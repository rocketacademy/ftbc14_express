// app.use('/students', studentRouter)

//http://localhost:8080/students/addresses

class StudentRouter {
  constructor(studentController, express) {
    this.controller = studentController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();
    router.get("/addresses", this.controller.listAddresses);
    router.get("/addresses/:id", this.controller.listOneAddress);

    router.get("/", this.controller.list);
    router.get("/:id", this.controller.listOne);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.edit);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = StudentRouter;
