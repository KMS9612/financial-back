import { Request, Response } from "express";
import { FixedSchema } from "../model/fixedModel";

export const createFixedData = async (req: Request, res: Response) => {
  try {
    const { email, income, saving, fixed } = req.body;

    const CheckFixed = await FixedSchema.findOne({ email });

    if (!CheckFixed) {
      const newFixed = new FixedSchema({
        email,
        income,
        saving,
        fixed,
      });

      await newFixed.save();

      return res.status(200).json({
        income,
        saving,
        fixed,
        message: "고정 지출 설정에 성공했습니다.",
      });
    } else {
      console.log(CheckFixed);
      CheckFixed.income = income;
      CheckFixed.saving = saving;
      CheckFixed.fixed = fixed;
      CheckFixed.save();
      return res
        .status(200)
        .json({ message: "고정 지출 수정에 성공했습니다." });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const fetchFixedData = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const targetData = await FixedSchema.findOne({ email });

    
  } catch (err) {}
};
