import { Request, Response } from "express";
import { EditSchema } from "../model/editModel";

export const createTodayEdit = async (req: Request, res: Response) => {
  try {
    // Front에서 날짜 보낼때 yyyy/mm/dd 포맷으로 보내고 백엔드에서 쪼개서 저장
    const { email, date, financial_type, amount, place } = req.body;

    // date 문자열 가공 ('yyyy/mm/dd hh:mm')
    const month_str = date.split(" ")[0].slice(0, 7); // ('yyyy/mm')
    const day_str = date.split(" ")[0].slice(8);

    // 해당 이메일로 저장된 데이터가 있는지 확인
    const isEdit = await EditSchema.findOne({ email });

    if (!isEdit) {
      // 새로운 달은 data배열에 객체로 추가, 새로운 일(day)은 data배열의 해당 month객체에 date배열에 추가
      const newEdit = new EditSchema({
        email: email,
        data: [
          {
            month: month_str,
            date: [{ day: day_str, value: { financial_type, amount, place } }],
          },
        ],
      });

      await newEdit.save();
      return res.status(200).json({
        message: "새로운 달의 가계부 정보를 등록했습니다.",
        newEdit: newEdit,
      });
    } else {
      // 요청이메일에 이미 등록된 데이터가 있는 경우는 새로운 데이터를 기존 데이터에 추가하는 방식으로 진행
      const month_data = isEdit.data.find((e) => e.month === month_str);

      if (month_data) {
        // 새로운 달이 아닐경우 'date' 배열에 새로운 데이터를 추가합니다.
        month_data.date.push({
          day: day_str,
          value: { financial_type, amount, place },
        });
      } else {
        // 해당 월이 존재하지 않으면, 새로운 월을 추가합니다.
        isEdit.data.push({
          month: month_str,
          date: [{ day: day_str, value: { financial_type, amount, place } }],
        });
      }
      isEdit.save();
      return res.status(200).json({ isEdit: isEdit });
    }
  } catch (err) {
    return res.status(401).json({ message: "API실행중 오류 발생" });
  }
};

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
