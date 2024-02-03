import express from "express";
import { createFixedData, fetchFixedData } from "../controll/fixed";
import { verifyToken } from "../middleware/verify_token";

const router = express.Router();

router.post("/createFixedData", verifyToken, createFixedData);

router.get("/fetchFixedData", verifyToken, fetchFixedData);

export default router;
