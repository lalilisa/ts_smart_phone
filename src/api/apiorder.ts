import { Router } from "express";
import { createOrder, getOderUser, authenOrder, cancleOrder, getAllOder } from '../controller/ordercontroller';
import { authenticationToken, authorization } from '../middleware/auth';



const router:Router=Router()


router.get('/',authenticationToken,getOderUser)
router.get('/all_order',authorization,getAllOder)
router.post("/",authenticationToken,createOrder)
router.put("/",authenticationToken,authenOrder)
router.delete("/",authenticationToken,cancleOrder)
export default router