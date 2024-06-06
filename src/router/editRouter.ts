import express from "express";
import { createTodayEdit } from "../controll/edits/createTodayEdit";
import { verifyToken } from "../middleware/verify_token";
import { deleteOneEdit } from "../controll/edits/deleteDayOfEdit";
import { fetchAllFinancial } from "../controll/edits/fetchAllFinancial";
import { fetchMonthEdit } from "../controll/edits/fetchMonthEdit";
import fetchOnePageEdit from "../controll/edits/fetchOnePageEdit";
const router = express.Router();

router.post("/createEdit", verifyToken, createTodayEdit);

router.get("/fetchAllFinancial", verifyToken, fetchAllFinancial);

router.delete("/deleteOneEdit", verifyToken, deleteOneEdit);

router.get("/fetchMonthEdit", verifyToken, fetchMonthEdit);

router.get("/fetchOnePageEdit", verifyToken, fetchOnePageEdit);

export default router;
