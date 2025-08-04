const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./src/connection.js");

const router = require("./src/routes/router.js");
const { requestLogger } = require("./src/middlewares/request.middleware.js");
const PORT = process.env.PORT

if (!PORT) {
  console.error("PORT is not defined in .env file");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api", router);

app.get("/", (req, res) => {
  return res.json({ message: "API is running!" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API is running on port ${PORT}`);
});
