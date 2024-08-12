const express = require("express");
const tollRoutes = require("./routers/tollRoutes");

const app = express();
const port = 3000;

app.use(express.json()); //middleware
app.use("/", tollRoutes);

app.listen(port, () => {
  console.log(`Listening server at port ${port}`);
});

module.exports = app;
