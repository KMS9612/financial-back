import express from "express";
import { exchangeToken } from "../controll/token";
const router = express.Router();

router.post("/exchangeToken", exchangeToken);

export default router;
