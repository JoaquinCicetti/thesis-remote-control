import express from "express";
import fs from "fs";

const ip = require("ip");

const router = express.Router();

router.get("/", (req: any, res: any) => {
  const data = fs.readFileSync("./src/public/index.html").toString();
  res.set("Cache-Control", "private, max-age: 0");
  res.set("Content-Type", "text/html; charset=UTF-8");

  if (data) res.send(data.replace("{ip}", ip.address()));
});
export default router;
