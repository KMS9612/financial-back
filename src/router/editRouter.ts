import express from "express";
import { createTodayEdit, fetchAllFinancial } from "../controll/edit";
import { verifyToken } from "../middleware/verify_token";
const router = express.Router();

router.post("/createEdit", verifyToken, createTodayEdit);

router.get("/fetchAllFinancial", verifyToken, fetchAllFinancial);

export default router;
