import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const password_hashed = await bcryptjs.hash(password, salt);

  req.body.password_hashed = password_hashed;
  next();
};
