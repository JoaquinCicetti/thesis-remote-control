"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var ip = require("ip");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var data = fs_1.default.readFileSync("./src/public/index.html").toString();
    res.set("Cache-Control", "private, max-age: 0");
    res.set("Content-Type", "text/html; charset=UTF-8");
    if (data)
        res.send(data.replace("{ip}", ip.address()));
});
exports.default = router;
