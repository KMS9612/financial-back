"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = require("../controll/token");
const router = express_1.default.Router();
router.post("/exchangeToken", token_1.exchangeToken);
exports.default = router;
