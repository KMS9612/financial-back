import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  const secretKey: Secret = process.env.CRYPTO_KEY || "jwt-secret-key";
  const verifyOption = { clockTolerance: 30, debug: true };
  jwt.verify(token, secretKey, verifyOption, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(401); // 토큰 만료에 대해 401(Unauthorized) 응답을 반환합니다.
    }
    next();
  });
};
