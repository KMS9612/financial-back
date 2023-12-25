"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exchangeToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const cryptoKey = process.env.CRYPTO_KEY || "jwt-crypto-key";
    if (!refreshToken) {
        return res
            .status(409)
            .json({ message: "Refresh토큰이 존재하지 않습니다." });
    }
    jsonwebtoken_1.default.verify(refreshToken, cryptoKey, (err, decode) => {
        if (err) {
            // 토큰만료 혹은 잘못된 토큰일 경우 예외처리
            return res.status(403).json({ message: "Token이 유효하지 않습니다." });
        }
        const payload = { email: decode.email };
        const option = { expiresIn: "15m" };
        const newToken = jsonwebtoken_1.default.sign(payload, cryptoKey, option);
        return res.status(200).json({
            message: "토큰이 정상적으로 재발급 되었습니다.",
            newAccessToken: newToken,
        });
    });
};
exports.exchangeToken = exchangeToken;
