"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FixedData = new mongoose_1.default.Schema({
    email: { type: String, require: true },
    income: { type: Number, require: true },
    saving: { type: Number, require: true },
    fixed: { type: Number, require: true },
});
exports.FixedSchema = mongoose_1.default.model("Fixed", FixedData);
