import { Request, Response } from "express";
import { User } from "../model/userModel";
import bcryptjs from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password_hashed } = req.body;
    const user = new User({ email, password_hashed });

    await user.save();

    return res.status(200).json({ message: "사용자 생성이 완료되었습니다." });
  } catch (err) {
    return res.status(500).json({ message: "사용자 생성 오류", error: err });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    // req 정보 변수에 저장
    const { email, password, password_hashed } = req.body;

    const UserInfo = await User.findOne({ email });
    const uid = UserInfo?.uid;

    // Token 발급
    const token = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    // 비밀번호 매칭 로직
    // hash(salt)된 비밀번호 비교
    const isPasswordMatch = await bcryptjs.compare(password, password_hashed);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
    } else {
      // 유저검증이 성공했다면 jwt token 발급
      return res.status(201).send({
        message: "로그인에 성공하였습니다.",
        accessToken: token,
        refreshToken: refreshToken,
        uid: uid,
      });
    }
  } catch (err) {
    return res.status(401).json({ message: "로그인 실패", err: err });
  }
};

const generateAccessToken = (email: string) => {
  const payload = { email };
  const cryptoKey: Secret = process.env.CRYPTO_KEY || "jwt-secret-key";

  const token = jwt.sign(payload, cryptoKey, {
    algorithm: "HS256",
    expiresIn: "30m",
  });

  return token;
};

const generateRefreshToken = (email: String) => {
  const payload = { email };
  const cryptoKey: Secret = process.env.CRYPTO_KEY || "jwt-secret-key";

  const refreshToken = jwt.sign(payload, cryptoKey, {
    algorithm: "HS256",
    expiresIn: "30d",
  });

  return refreshToken;
};
