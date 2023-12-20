import { NextFunction, Request, Response } from "express";
import { User } from "../model/userModel";

// 존재하는 이메일인지 확인
export const findForSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findEmail = await User.findOne({
    email: req.body.email,
  });
  console.log("findEmail:", findEmail);
  if (findEmail) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }
  if (!findEmail) {
    next();
  }
};

export const findForLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findEmail = await User.findOne({
    email: req.body.email,
  });

  if (!findEmail) {
    return res.status(409).json({ message: "이메일이 존재하지 않습니다." });
  }
  if (findEmail) {
    req.body.password_hashed = findEmail.password_hashed;
    next();
  }
};
