const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const cors = require("cors");
const dotenv = require("dotenv");

const app = express(); 

dotenv.config();

const PORT = process.env.PORT || 8070;


app.use(cors());
app.use(bodyParser.json()); 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection success!");
});

const inventoryRouter = require("./routes/Inventorys");

app.use("/inventory",inventoryRouter);

connection.on("error", (err) => {
  console.error("MongoDB Connection error:", err);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`); 
});