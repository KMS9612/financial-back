import { Request, Response } from "express";
import { EditSchema } from "../../model/editModel";

export const fetchAllFinancial = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const data = await EditSchema.findOne({ email });

    return res.status(200).json({ data: data });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "유저 가계부 기록 불러오기 실패", err: err });
  }
};
