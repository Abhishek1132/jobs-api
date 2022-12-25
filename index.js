require("dotenv").config();
require("express-async-errors");

//secuirty packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const connectDB = require("./db/connect");

//middlewares
const authenticate = require("./middlewares/authorize");
const checkAdmin = require("./middlewares/checkAdmin");
const routeNotFound = require("./middlewares/route-not-found");
const errorHandler = require("./middlewares/error-handler");

//routers
const jobsRouter = require("./routes/jobs");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Jobs API Server Version 1.0.0.");
});

app.use("/api/v1/adminaccess", authenticate, checkAdmin, adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", authenticate, jobsRouter);

app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server running on port:${port}/`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
