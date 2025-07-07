import express from "express";
import { Router } from "express";

const app = express();

const router = Router();

router.get("/:word([a-zA-Z]+)", (req, res) => {
  const { word } = req.params;
  res.send(`Hello ${word}`);
});

app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
