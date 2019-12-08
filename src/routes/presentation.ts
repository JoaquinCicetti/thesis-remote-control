import express from "express";
import fs from "fs";
const ip = require("ip");

const router = express.Router();

router.get("/", (req: any, res: any) => {
  const data = fs
    .readFileSync("../thesis-presentation/build/index.html")
    .toString();
  const config = ip.address() ;
  res.set("Cache-Control", "private, max-age: 0");
  res.set("Content-Type", "text/html; charset=UTF-8");
  if (data) res.send(data.replace("this-is-a-dummy-config", config));
});
router.use("/static", express.static("../thesis-presentation/build/static"));
router.use("/", express.static("../thesis-presentation/build"));
export default router;
