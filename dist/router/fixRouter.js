"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fixed_1 = require("../controll/fixed");
const router = express_1.default.Router();
router.post("/createFixedData", fixed_1.createFixedData);
router.get("/fetchFixedData");
exports.default = router;
