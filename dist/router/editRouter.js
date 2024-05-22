"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTodayEdit_1 = require("../controll/edits/createTodayEdit");
const verify_token_1 = require("../middleware/verify_token");
const deleteDayOfEdit_1 = require("../controll/edits/deleteDayOfEdit");
const fetchAllFinancial_1 = require("../controll/edits/fetchAllFinancial");
const fetchMonthEdit_1 = require("../controll/edits/fetchMonthEdit");
const router = express_1.default.Router();
router.post("/createEdit", verify_token_1.verifyToken, createTodayEdit_1.createTodayEdit);
router.get("/fetchAllFinancial", verify_token_1.verifyToken, fetchAllFinancial_1.fetchAllFinancial);
router.delete("/deleteOneEdit", verify_token_1.verifyToken, deleteDayOfEdit_1.deleteOneEdit);
router.get("/fetchMonthEdit", fetchMonthEdit_1.fetchMonthEdit);
exports.default = router;
