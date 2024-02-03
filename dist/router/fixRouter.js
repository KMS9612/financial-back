"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fixed_1 = require("../controll/fixed");
const verify_token_1 = require("../middleware/verify_token");
const router = express_1.default.Router();
router.post("/createFixedData", verify_token_1.verifyToken, fixed_1.createFixedData);
router.get("/fetchFixedData", verify_token_1.verifyToken, fixed_1.fetchFixedData);
exports.default = router;
