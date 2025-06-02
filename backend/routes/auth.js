import express from "express";
import enterInfo from "./../controllers/authController.js";

const router = express.Router();

router.post("/enterInfo", enterInfo);

export default router;
