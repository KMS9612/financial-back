"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Day = new mongoose_1.default.Schema({
    day: { type: String, require: true },
    value: {
        financial_type: { type: String, require: true },
        amount: { type: Number, require: true },
        place: { type: String, require: true },
    },
});
const Month = new mongoose_1.default.Schema({
    month: { type: String, require: true },
    date: {
        type: [Day],
        default: [],
    },
});
const Edit = new mongoose_1.default.Schema({
    email: { type: String, require: true },
    data: { type: [Month], default: [] },
});
exports.EditSchema = mongoose_1.default.model("Edit", Edit);
