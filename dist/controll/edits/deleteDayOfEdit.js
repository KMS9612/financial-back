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
exports.deleteOneEdit = void 0;
const editModel_1 = require("../../model/editModel");
const deleteOneEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, monthID, dayID } = req.body;
    try {
        const result = yield editModel_1.EditSchema.updateOne({ email, "data._id": monthID }, { $pull: { "data.$.date": { _id: dayID } } });
        return res.status(200).json({
            message: "데이터 삭제 성공",
            result,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "데이터를 삭제하는 데 실패했습니다.",
            err,
        });
    }
});
exports.deleteOneEdit = deleteOneEdit;
