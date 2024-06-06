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
const editModel_1 = require("../../model/editModel");
function fetchOnePageEdit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { email, page = 1, limit = 10 } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            const result = yield editModel_1.EditSchema.aggregate([
                { $match: { email } },
                { $unwind: "$data" },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $group: {
                        _id: "$_id",
                        data: { $push: "$data" },
                    },
                },
            ]);
            if (!result.length) {
                return res.status(404).json({
                    message: "해당 이메일로 등록된 데이터가 없습니다.",
                });
            }
            const paginatedData = result[0].data;
            const totalCountResult = yield editModel_1.EditSchema.aggregate([
                { $match: { email } },
                { $unwind: "$data" },
                { $count: "totalCount" },
            ]);
            const totalCount = totalCountResult.length
                ? totalCountResult[0].totalCount
                : 0;
            if (result.length < 10) {
                return res.status(200).json({
                    message: "마지막페이지",
                    data: paginatedData,
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                });
            }
            res.status(200).json({
                data: paginatedData,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        }
        catch (err) {
            return res.status(400).json({ err });
        }
        return;
    });
}
exports.default = fetchOnePageEdit;
