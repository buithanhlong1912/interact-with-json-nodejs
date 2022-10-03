const express = require("express");
const app = express();
const http = require("http");
const routes = require("./routes");

const server = http.createServer(app);

const port = process.env.PORT || "3001";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
