import { Router, Request, Response } from 'express';

const router:Router=Router()

router.get('/',(req:Request,res:Response)=>{
        res.render("category")
})

router.get('/:id',(req:Request,res:Response)=>{
    res.render("single-product")
})

export default router