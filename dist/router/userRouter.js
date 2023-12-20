"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controll/user");
const password_hash_1 = require("../middleware/password_hash");
const find_id_1 = require("../middleware/find_id");
const router = express_1.default.Router();
router.post("/createUser", password_hash_1.hashPassword, find_id_1.findForSignUp, user_1.createUser);
router.post("/login", find_id_1.findForLogin, user_1.Login);
exports.default = router;
