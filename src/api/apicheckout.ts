import { Request, Router,Response } from "express";
import { checkout, create } from '../controller/checkoutcontrller';
import { authenticationToken } from "../middleware/auth";





const router:Router=Router()

router.get('/detail',(req,res)=>{
    res.json("sss")
})
router.get("/",checkout)

router.post("/",authenticationToken,create)



export default router