import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getSingleUser,
  getAllUser,
} from "./../controllers/userController.js";

const router = express.Router();

//create new user
router.post("/", createUser);

//delete new user
router.delete("/:id", deleteUser);

//update new user
router.put("/:id", updateUser);

//get single user
router.get("/:id", getSingleUser);

//get all user
router.get("/", getAllUser);

export default router;
