import { Request, Response, Router } from "express";
import { Register } from '../Model/Register';
import { registerAccount } from '../controller/registercontrller';
import { checkUserExist } from '../middleware/registermiddlerware';



const router:Router = Router()

router.post("/",checkUserExist,registerAccount)

export default router