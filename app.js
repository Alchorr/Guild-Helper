//read module express 
const express = require("express");
//initialization of a new Express.js server
const app = express();
//specification of the port on which the application should run on localhost 
const port = 3000;

//simple route definition with HTTP GET method that returns text
app.get("/", (req, res) => {
  res.send('Hello World!')
});

//setting the port on which the HTTP server should run  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});