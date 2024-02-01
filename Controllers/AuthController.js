require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

class AuthController {
  constructor(model) {
    this.model = model;
  }

  verify = (req, res, next) => {
    try {
      console.log(req.headers);
      const accessToken = req.headers.authorization.split(" ")[1];
      console.log(accessToken);
      // if (!accessToken) {
      //   return res.status(401).json({
      //     error: true,
      //     msg: "Error: missing or invalid access token.",
      //   });
      // }
      const user = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = user;
      console.log("user", req.user);
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        error: true,
        msg: "Error: unauthorised access, invalid token.",
      });
    }
  };

  signUp = async (req, res) => {
    const { firstName, lastName, gender, email, password } = req.body;
    console.log("body", req.body);
    console.log(firstName, lastName, gender, email, password);
    // if (!firstName || !lastName || !gender || !email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "missing first name, last name, gender, email, or password",
    //   });
    // }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await this.model.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
    });

    const payload = { id: newUser.id, firstName };
    const token = this.generateToken(payload);
    const refreshToken = this.generateToken(payload, true);
    this.saveToken(refreshToken, newUser.id);
    res.cookie("jwt-token", token, {
      // sameSite: "None",
      secure: false,
      expires: new Date(Date.now() + 9999999),
      path: "/",
    });
    res.cookie("jwt-refresh", refreshToken, {
      // sameSite: "None",
      secure: false,
      expires: new Date(Date.now() + 3456000000),
      path: "/",
    });
    return res.json({ success: true, token, id: newUser.id });
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, msg: "incorrect user email" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res
        .status(403)
        .json({ success: false, msg: "incorrect password" });
    }

    const payload = { id: user.id, firstName: user.firstName };
    const token = this.generateToken(payload);
    const refreshToken = this.generateToken(payload, true);
    this.saveToken(refreshToken, user.id);
    res.cookie("jwt-token", token, {
      // sameSite: "None",
      secure: false,
      expires: new Date(Date.now() + 9999999),
      path: "/",
    });
    res.cookie("jwt-refresh", refreshToken, {
      // sameSite: "None",
      secure: false,
      expires: new Date(Date.now() + 3456000000),
      path: "/",
    });
    return res.json({
      success: true,
      msg: "user authenticated",
      token,
      id: user.id,
    });
  };

  generateToken = (payload, refresh = false) => {
    if (refresh) {
      return jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
      });
    } else {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    }
  };

  saveToken = async (token, userId) => {
    try {
      await this.model.update(
        { refreshToken: token },
        { where: { id: userId } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  signOut = async (req, res) => {
    console.log("signout");
    const cookies = req.cookies;
    console.log(cookies);
    // if (!cookies?["jwt-refresh"]) {
    //   return res.sendStatus(204); // Successful req, nothing to send back
    // }
    // const refreshToken = cookies["jwt-refresh"];
    // const foundUser = await this.model.findOne({ where: { refreshToken } });
    if (!foundUser) {
      res.clearCookie("jwt-refresh", {
        secure: false,
        path: "/",
      });
      return res.sendStatus(204);
    }
    try {
      await foundUser.update({ refreshToken: "" });
      res.clearCookie("jwt-token", {
        secure: false,
        path: "/",
      });
      res.clearCookie("jwt-refresh", {
        secure: false,
        path: "/",
      });
      return res.sendStatus(204);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, msg: "failed to erase token" });
    }
  };

  //Not implemented below
  refreshToken = async (req, res) => {
    console.log(req.cookies);
    const cookies = req.cookies;
    // if (!cookies?["jwt-refresh"]) {
    //   return res.sendStatus(204); // Successful req, nothing to send back
    // }
    const refreshToken = cookies["jwt-refresh"];
    const foundUser = await this.model.findOne({ where: { refreshToken } });
    if (!foundUser) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
      if (err || user.firstName !== foundUser.firstName) {
        return res
          .status(403)
          .json({ success: false, msg: "invalid refresh token" });
      }
      const payload = { id: user.id, firstName: user.firstName };
      const token = this.generateToken(payload);
      res.json({ success: true, msg: "token refreshed", token, id: user.id });
    });
  };
}

module.exports = AuthController;
