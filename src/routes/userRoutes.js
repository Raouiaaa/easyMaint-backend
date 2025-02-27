import express from "express";
import {getAllUsersFromDB, addUser, loginUser, usersFiltered} from "../controllers/userController.js";


const router = express.Router();

router.get('/', getAllUsersFromDB);
router.post("/", addUser);
router.post("/login", loginUser);
router.get("/users-filtered", usersFiltered);

export default router;

