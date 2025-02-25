const express = require("express");
const dotenv = require("dotenv");
const notRoute = require("./routes/note.js");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

app.use(express.json());

PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Veri tabanı bağlandı");

    app.listen(PORT, () => {
      console.log(`Server ${PORT} u dinleniyor`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/notes", notRoute);
