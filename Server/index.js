const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://admin-panel-hadramaut-react.vercel.app/");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// Use CORS middleware with the defined options
app.use(cors());
// Including all routes
const loginRoutes = require("./routes/loginRoutes");
const updateRoutes = require("./routes/updateRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const createRoutes = require("./routes/createRoutes");
const viewRoutes = require("./routes/getRoutes");
const mailRoutes = require("./routes/emailRoutes");

// Assigning routes
app.disable("x-powered-by");
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/login", loginRoutes);
app.use("/view", viewRoutes);
app.use("/create", createRoutes);
app.use("/update", updateRoutes);
app.use("/delete", deleteRoutes);
app.use("/mail", mailRoutes);

// Running the backend server
app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
