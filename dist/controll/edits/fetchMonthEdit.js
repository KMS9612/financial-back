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
exports.fetchMonthEdit = void 0;
const editModel_1 = require("../../model/editModel");
/** 요청으로 받은 연/월 데이터에 해당하는 값을 반환하는 API */
const fetchMonthEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, yearMonth } = req.query;
        const result = yield editModel_1.EditSchema.aggregate([
            { $match: { email: email } }, // 특정 email에 해당하는 문서 찾기
            {
                $project: {
                    data: {
                        $filter: {
                            input: "$data",
                            as: "data",
                            cond: { $eq: ["$$data.month", yearMonth] }, // targetMonth와 일치하는 월만 선택
                        },
                    },
                },
            },
        ]);
        if (!result) {
            return res.status(204).json({ result, message: "데이터가 없습니다." });
        }
        else {
            return res.status(200).json({ result });
        }
    }
    catch (err) {
        return res.status(401).json({
            message: "특정 달 데이터 불러오기에 실패했습니다",
            err,
        });
    }
});
exports.fetchMonthEdit = fetchMonthEdit;
