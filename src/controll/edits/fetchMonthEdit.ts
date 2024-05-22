import { Request, Response } from "express";
import { EditSchema } from "../../model/editModel";

/** 요청으로 받은 연/월 데이터에 해당하는 값을 반환하는 API */
export const fetchMonthEdit = async (req: Request, res: Response) => {
  try {
    const { email, yearMonth } = req.query;

    const result = await EditSchema.aggregate([
      { $match: { email: email } }, // 특정 email에 해당하는 문서 찾기
      {
        $project: {
          data: {
            $filter: {
              input: "$data",
              as: "data",
              cond: { $eq: ["$$data.month", yearMonth] }, // targetMonth와 일치하는 월만 선택
            },
          },
        },
      },
    ]);
    if (!result) {
      return res.status(204).json({ result, message: "데이터가 없습니다." });
    } else {
      return res.status(200).json({ result });
    }
  } catch (err) {
    return res.status(401).json({
      message: "특정 달 데이터 불러오기에 실패했습니다",
      err,
    });
  }
};
