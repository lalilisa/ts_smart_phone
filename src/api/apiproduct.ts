import { Request, Response, Router,NextFunction } from 'express';
import { getAllProduct, getProductByID, AddModelProduct, UpdateModelProduct, AddDetailProduct, getDetailProductByID, UpdateDetailProduct, getAllDetailProduct, deleteDetail, deleteModel, getAllDetailProductByIDProduct } from '../controller/productcontroller';
import { createModelProduct, deleteDetailProduct } from '../DAO/productquery';
import { ModelProduct } from '../Model/ModelProduct';
import { upload } from '../upload/configstorage';


const router:Router=Router()


router.post("/",upload.single('formFile'),AddModelProduct)

router.get("/",getAllProduct)

router.get("/detailsamemodel/:id",getAllDetailProductByIDProduct)

router.get("/detail",getAllDetailProduct)

router.post("/detail", upload.single('filedetail'),AddDetailProduct) 

router.delete("/:id",deleteModel)

router.get("/:id",getProductByID)

router.put("/:id",upload.single('formFile'),UpdateModelProduct)



router.get("/detail/:id",getDetailProductByID)

router.delete("/detail/:id",deleteDetail)


router.put("/detail/:id",upload.single('filedetail'),UpdateDetailProduct)





export default router