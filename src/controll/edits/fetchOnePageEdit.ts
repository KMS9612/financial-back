import { Request, Response } from "express";
import { EditSchema } from "../../model/editModel";
/* 요청받은 page를 10개 반환하는 API */
export default async function fetchOnePageEdit(req: Request, res: Response) {
  try {
    let { email, page = 1, limit = 10 } = req.query;

    page = parseInt(page as string);
    limit = parseInt(limit as string);

    const result = await EditSchema.aggregate([
      { $match: { email } },
      { $unwind: "$data" },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $group: {
          _id: "$_id",
          data: { $push: "$data" },
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({
        message: "해당 이메일로 등록된 데이터가 없습니다.",
      });
    }

    const paginatedData = result[0].data;

    const totalCountResult = await EditSchema.aggregate([
      { $match: { email } },
      { $unwind: "$data" },
      { $count: "totalCount" },
    ]);

    const totalCount = totalCountResult.length
      ? totalCountResult[0].totalCount
      : 0;

    if (result.length < 10) {
      return res.status(200).json({
        message: "마지막페이지",
        data: paginatedData,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
    }
    res.status(200).json({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    return res.status(400).json({ err });
  }
  return;
}
