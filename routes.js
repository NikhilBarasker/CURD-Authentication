import express, { Router } from "express";
import { registerUser, loginUser,fetchUser,getUser,editInfo,deleteUser} from "./controler.js";
const router = express.Router();
router.post('/add', registerUser)
router.post('/login', loginUser)
router.post('/info', fetchUser)
router.get('/:id', getUser)
router.post('/:id', editInfo)
router.delete('/:id', deleteUser)

export default router;