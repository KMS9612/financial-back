import { Request, Response } from "express";
import { EditSchema } from "../../model/editModel";

export const deleteOneEdit = async (req: Request, res: Response) => {
  const { email, monthID, dayID } = req.body;
  try {
    const result = await EditSchema.updateOne(
      { email, "data._id": monthID },
      { $pull: { "data.$.date": { _id: dayID } } }
    );
    return res.status(200).json({
      message: "데이터 삭제 성공",
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "데이터를 삭제하는 데 실패했습니다.",
      err,
    });
  }
};
