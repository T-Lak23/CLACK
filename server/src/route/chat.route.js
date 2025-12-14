import express from "express";
import { createUserStreamToken } from "../controller/chat.controller.js";
import { protectUser } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/token", protectUser, createUserStreamToken);

export default router;
