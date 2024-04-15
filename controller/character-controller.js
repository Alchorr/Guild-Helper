const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/character/create-abl");
const GetAbl = require("../abl/character/get-abl");


  router.get("/get", async (req, res) => {
    const { query } = req;
    await GetAbl(query, res)
  });

  router.post("/create", async (req, res) => {
    const { body } = req;
    await CreateAbl(body, res)
  });

module.exports = router