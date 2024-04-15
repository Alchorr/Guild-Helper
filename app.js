"use strict";

const express = require("express");
const characterRouter = require("./controller/character-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/character", characterRouter);


app.listen(3000, () => {
  console.log("Express server listening on port 3000.")
});