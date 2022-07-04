const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");
const router = express.Router();
const Token = require("../Schema/tokenSchema");

router.post("/api/signup", async (req, res) => {
  try {
    const password = req.body.password;
    if (password.length < 6) {
      res.status(400).send({ error: "Password too small" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      req.body.password = hashedPassword;

      const user = new User(req.body);

      await user.save();

      res.status(201).send({response:'success', message:'User Created Successfully'});
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const password = req.body.password;
    const userInfo = await User.findOne({ emailID: req.body.emailID });
    if (userInfo) {
      const hashedPassword = userInfo.password;

      const result = await bcrypt.compare(password, hashedPassword);

      if (result) {
        // Send JWT Token

        const token = jwt.sign(
          { _id: userInfo._id.toString() },
          process.env.JWT_TOKEN_SECRET_KEY,
          { expiresIn: '3d' }
        );
        const userToken = new Token({ userID: userInfo._id, token });
        await userToken.save();

        res.status(200).send({ response:'success' ,token: userToken.token , firstName : userInfo.firstName});
      } else {
        res.status(401).send({ error: "Incorrect Passowrd" });
      }
    } else {
      res.status(401).send({ error: "User Not Found" });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
