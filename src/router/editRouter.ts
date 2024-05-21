import express from "express";
import { createTodayEdit, fetchAllFinancial } from "../controll/edit";
import { verifyToken } from "../middleware/verify_token";
import { deleteOneEdit } from "../controll/deleteDayOfEdit";
const router = express.Router();

router.post("/createEdit", verifyToken, createTodayEdit);

router.get("/fetchAllFinancial", verifyToken, fetchAllFinancial);

router.delete("/deleteOneEdit", verifyToken, deleteOneEdit);

export default router;
