import express from "express";
import { Login, createUser } from "../controll/user";
import { hashPassword } from "../middleware/password_hash";
import { findForLogin, findForSignUp } from "../middleware/find_id";
const router = express.Router();

router.post("/createUser", hashPassword, findForSignUp, createUser);

router.post("/login", findForLogin, Login);

export default router;
