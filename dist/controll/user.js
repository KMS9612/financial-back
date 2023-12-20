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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.createUser = void 0;
const userModel_1 = require("../model/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password_hashed } = req.body;
        const user = new userModel_1.User({ email, password_hashed });
        yield user.save();
        return res.status(200).json({ message: "사용자 생성이 완료되었습니다." });
    }
    catch (err) {
        return res.status(500).json({ message: "사용자 생성 오류", error: err });
    }
});
exports.createUser = createUser;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req 정보 변수에 저장
        const { email, password, password_hashed } = req.body;
        const UserInfo = yield userModel_1.User.findOne({ email });
        const uid = UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.uid;
        // Token 발급
        const token = generateAccessToken(email);
        const refreshToken = generateRefreshToken(email);
        // 비밀번호 매칭 로직
        // hash(salt)된 비밀번호 비교
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, password_hashed);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
        }
        else {
            // 유저검증이 성공했다면 jwt token 발급
            return res.status(201).send({
                message: "로그인에 성공하였습니다.",
                accessToken: token,
                refreshToken: refreshToken,
                uid: uid,
            });
        }
    }
    catch (err) {
        return res.status(401).json({ message: "로그인 실패", err: err });
    }
});
exports.Login = Login;
const generateAccessToken = (email) => {
    const payload = { email };
    const cryptoKey = process.env.CRYPTO_KEY || "jwt-secret-key";
    const token = jsonwebtoken_1.default.sign(payload, cryptoKey, {
        algorithm: "HS256",
        expiresIn: "30m",
    });
    return token;
};
const generateRefreshToken = (email) => {
    const payload = { email };
    const cryptoKey = process.env.CRYPTO_KEY || "jwt-secret-key";
    const refreshToken = jsonwebtoken_1.default.sign(payload, cryptoKey, {
        algorithm: "HS256",
        expiresIn: "30d",
    });
    return refreshToken;
};
