// app.use('/addresses', addressRouter)

class AuthRouter {
  constructor(model, express) {
    this.controller = model;
    this.express = express;
  }

  route = () => {
    // seed data into classes
    // many - many relationship between users and classes.

    let router = this.express.Router();
    router.post("/signup", this.controller.signUp);
    router.post("/signin", this.controller.signIn);
    router.get("/signout", this.controller.signOut);
    router.get("/refresh", this.controller.refreshToken);

    return router;
  };
}

module.exports = AuthRouter;
