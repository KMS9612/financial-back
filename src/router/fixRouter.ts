import express from "express";
import { createFixedData } from "../controll/fixed";

const router = express.Router();

router.post("/createFixedData", createFixedData);

router.get("/fetchFixedData");

export default router;
