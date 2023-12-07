const express = require("express");
const path = require("path");
require("dotenv").config();

//routes
const apiRoutes = require("./routes/apiRoutes");
const exp = require("constants");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", apiRoutes);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
