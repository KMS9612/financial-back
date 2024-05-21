"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const edit_1 = require("../controll/edit");
const verify_token_1 = require("../middleware/verify_token");
const deleteDayOfEdit_1 = require("../controll/deleteDayOfEdit");
const router = express_1.default.Router();
router.post("/createEdit", verify_token_1.verifyToken, edit_1.createTodayEdit);
router.get("/fetchAllFinancial", verify_token_1.verifyToken, edit_1.fetchAllFinancial);
router.delete("/deleteOneEdit", deleteDayOfEdit_1.deleteOneEdit);
exports.default = router;
