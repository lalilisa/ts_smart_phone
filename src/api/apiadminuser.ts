import { Request, Response, Router } from "express";
import { deleteuser, getUser, updateInfor, getAllUser } from '../controller/useradmincontroller';

import { authenticationToken, authorization } from '../middleware/auth';




const router:Router=Router()
router.get("/",authorization,getAllUser)
router.get("/:username",authorization,getUser)

router.put("/:username",authorization,updateInfor)
router.delete("/:username",authorization,deleteuser)

export default router