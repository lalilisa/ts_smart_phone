import { Router, Request, Response } from 'express';



const router:Router=Router()

router.get("",(req:Request,res:Response)=>{
    res.render("adminpage")
})
router.get("/infor/:username",(req:Request,res:Response)=>{
    res.render("profileadmin")
})
router.get("/showproduct/:id",(req:Request,res:Response)=>{
    res.render("editModel")
})
router.get("/showproduct",(req:Request,res:Response)=>{
    res.render("productadmin")
})
router.get("/showdetail/:id",(req:Request,res:Response)=>{
    res.render("editDetail")
})
router.get("/add-product",(req:Request,res:Response)=>{
    res.render("addproduct")
})
export default router