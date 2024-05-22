"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFinancial = void 0;
const editModel_1 = require("../../model/editModel");
const fetchAllFinancial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const data = yield editModel_1.EditSchema.findOne({ email });
        return res.status(200).json({ data: data });
    }
    catch (err) {
        return res
            .status(401)
            .json({ message: "유저 가계부 기록 불러오기 실패", err: err });
    }
});
exports.fetchAllFinancial = fetchAllFinancial;
