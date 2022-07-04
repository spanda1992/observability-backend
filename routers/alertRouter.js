const express = require("express");
const Alert = require("../Schema/alertSchema");
const processAlert = require("../utils/processAlert");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/api/alerts", auth, async (req, res) => {
  try {
    let pageNum = 1;
    const range =5

    if (req.query.page) {
      if (
        typeof req.query.page !== "number" &&
        req.query.page < 1 &&
        req.query.page - (Math.floor(req.query.page) !== 0)
      ) {
        res.status(400).send({error : 'Page Paramter is not correctly set'})
      }else{

        pageNum = req.query.page
        const alerts = await Alert.find().sort({ createdAt: -1 }).skip((pageNum - 1)* range).limit(range);
        res.status(200).send(alerts);
      }
    }else{
        pageNum =1
        const alerts = await Alert.find().sort({ createdAt: -1 }).skip((pageNum - 1)* range).limit(range);
        res.status(200).send(alerts);
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/api/alerts", auth, async (req, res) => {
  try {
    const processedAlert = await processAlert(req.body);
    const alert = new Alert(processedAlert);
    await alert.save();
    res.status(201).send(alert);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
