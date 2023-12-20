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
exports.findForLogin = exports.findForSignUp = void 0;
const userModel_1 = require("../model/userModel");
// 존재하는 이메일인지 확인
const findForSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findEmail = yield userModel_1.User.findOne({
        email: req.body.email,
    });
    console.log("findEmail:", findEmail);
    if (findEmail) {
        return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }
    if (!findEmail) {
        next();
    }
});
exports.findForSignUp = findForSignUp;
const findForLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findEmail = yield userModel_1.User.findOne({
        email: req.body.email,
    });
    if (!findEmail) {
        return res.status(409).json({ message: "이메일이 존재하지 않습니다." });
    }
    if (findEmail) {
        req.body.password_hashed = findEmail.password_hashed;
        next();
    }
});
exports.findForLogin = findForLogin;
