import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const exchangeToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const cryptoKey: Secret = process.env.CRYPTO_KEY || "jwt-crypto-key";

  if (!refreshToken) {
    return res
      .status(409)
      .json({ message: "Refresh토큰이 존재하지 않습니다." });
  }

  jwt.verify(refreshToken, cryptoKey, (err: any, decode: any) => {
    if (err) {
      // 토큰만료 혹은 잘못된 토큰일 경우 예외처리
      return res.status(403).json({ message: "Token이 유효하지 않습니다." });
    }
    const payload = { email: decode.email };
    const option = { expiresIn: "15m" };
    const newToken = jwt.sign(payload, cryptoKey, option);
    return res.status(200).json({
      message: "토큰이 정상적으로 재발급 되었습니다.",
      newAccessToken: newToken,
    });
  });
};
