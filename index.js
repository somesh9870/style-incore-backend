const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const app = express();

app.use(express.json());
app.use(cors());

// user sign up and login routes
app.use("/user", userRouter);
app.use('/product', productRouter)


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("error in connecting mongoDB", err);
  }

  console.log(`server is running on port ${process.env.PORT} `);
});
