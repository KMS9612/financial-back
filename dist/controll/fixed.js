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
exports.fetchFixedData = exports.createFixedData = void 0;
const fixedModel_1 = require("../model/fixedModel");
const createFixedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, income, saving, fixed } = req.body;
        const CheckFixed = yield fixedModel_1.FixedSchema.findOne({ email });
        if (!CheckFixed) {
            const newFixed = new fixedModel_1.FixedSchema({
                email,
                income,
                saving,
                fixed,
            });
            yield newFixed.save();
            return res.status(200).json({
                income,
                saving,
                fixed,
                message: "고정 지출 설정에 성공했습니다.",
            });
        }
        else {
            console.log(CheckFixed);
            CheckFixed.income = income;
            CheckFixed.saving = saving;
            CheckFixed.fixed = fixed;
            CheckFixed.save();
            return res
                .status(200)
                .json({ message: "고정 지출 수정에 성공했습니다." });
        }
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
});
exports.createFixedData = createFixedData;
const fetchFixedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const targetData = yield fixedModel_1.FixedSchema.findOne({ email });
    }
    catch (err) { }
});
exports.fetchFixedData = fetchFixedData;
