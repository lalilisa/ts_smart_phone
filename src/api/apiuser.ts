import { Request, Response, Router } from "express";
import { getUser, updateInfor } from '../controller/usercontroller';
import { authenticationToken } from '../middleware/auth';




const router:Router=Router()

router.get("/:username",authenticationToken,getUser)
router.put("/:username",authenticationToken,updateInfor)

export default router