const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("../src/connection.js");
const router = require("./src/routes/router.js");
const { requestLogger } = require("../src/middlewares/request.middleware.js");

const PORT_CDN = process.env.PORT_CDN;

if (!PORT_CDN) {
  console.error("PORT_CDN is not defined in .env file");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api", router);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  return res.json({ message: "CDN is running!" });
});

app.listen(PORT_CDN, "0.0.0.0", () =>
  console.log(`CDN is running on port ${PORT_CDN}`)
);
