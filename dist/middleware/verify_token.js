"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "토큰이 없습니다." });
    }
    const secretKey = process.env.CRYPTO_KEY || "jwt-secret-key";
    const verifyOption = { clockTolerance: 30, debug: true };
    jsonwebtoken_1.default.verify(token, secretKey, verifyOption, (err, decoded) => {
        if (err) {
            return res.sendStatus(401); // 토큰 만료에 대해 401(Unauthorized) 응답을 반환합니다.
        }
        next();
    });
};
exports.verifyToken = verifyToken;
