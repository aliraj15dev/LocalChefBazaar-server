const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;

//? Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("LocalCheBazaar Server is Working");
});



app.listen(port, () => {
  console.log(`Server in running on port: ${port}`);
});
