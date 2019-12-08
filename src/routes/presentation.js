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
    var data = fs_1.default
        .readFileSync("../thesis-presentation/build/index.html")
        .toString();
    var config = ip.address();
    res.set("Cache-Control", "private, max-age: 0");
    res.set("Content-Type", "text/html; charset=UTF-8");
    if (data)
        res.send(data.replace("this-is-a-dummy-config", config));
});
router.use("/static", express_1.default.static("../thesis-presentation/build/static"));
router.use("/", express_1.default.static("../thesis-presentation/build"));
exports.default = router;
