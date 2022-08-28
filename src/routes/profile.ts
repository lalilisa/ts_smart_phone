import express, {Request,Response,NextFunction,Application, Router} from "express"


const router:Router =express.Router()

router.get("/:username",function(req:Request,res:Response){
        res.render("profile")
})



export default router