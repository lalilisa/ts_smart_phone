
import mysql from 'mysql';
import { database } from '../configDB';
import { ModelProduct } from '../Model/ModelProduct';
import { DetailProduct } from '../Model/DetailProduct';

export async  function findAllProduct(){
    try {
        const conn=mysql.createConnection(database)
        var listModelProduct:Array<ModelProduct>=[]
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select * from Product",(err,recordset)=>{
                if(err){
                   listModelProduct=undefined
                   return reject(listModelProduct)
                    
                }
                for(let i=0;i<recordset.length;i++){
                    listModelProduct.push(Object.assign(new ModelProduct(),recordset[i]))
                }

                return resolve(listModelProduct)
            })
        })
        return listModelProduct
    } catch (error) {
        console.log(error)
    }

}
export async  function findAllProductByID(id){
    try {
        const conn=mysql.createConnection(database)
        var listDetailProduct:DetailProduct[]=[]
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select * from Product inner join ProductDetail on Product.ID_Product=ProductDetail.ID_Product where Product.ID_Product=?",[id],(err,recordset)=>{
                if(err){
                    listDetailProduct=undefined
                    return reject(listDetailProduct)
                     
                 }
                 for(let i=0;i<recordset.length;i++){
                    listDetailProduct.push(Object.assign(new DetailProduct(),recordset[i]))
                 }
 
                 return resolve(listDetailProduct)
           
        })
        })
        return listDetailProduct
    }
        catch (error) {
             console.log(error)
    }

}
export async  function findModelProductByID(id){
    try {
        const conn=mysql.createConnection(database)
        var listDetailProduct:ModelProduct
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select * from Product  where ID_Product=?",[id],(err,recordset)=>{
                if(err){
                    listDetailProduct=undefined
                    return reject(listDetailProduct)
                     
                 }
                 for(let i=0;i<recordset.length;i++){
                    listDetailProduct=(Object.assign(new ModelProduct(),recordset[i]))
                 }
 
                 return resolve(listDetailProduct)
           
        })
        })
        return listDetailProduct
    }
        catch (error) {
             console.log(error)
    }

}
export async function createModelProduct(modelProduct:ModelProduct){
    try {
        const conn=mysql.createConnection(database)
        let record=[[modelProduct.getName(),modelProduct.getBrand(),modelProduct.getDescribes(),modelProduct.getImg(),modelProduct.getRAM(),modelProduct.getROM(),modelProduct.getDiscount(),modelProduct.getId_category()]]
        console.log(record)
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("insert into Product(Name,Brand,Describes,img,RAM,ROM,Discount,id_category) values ?",[record],(err,recordset)=>{
                if(err){
                  console.log(err)
                   return reject(undefined)
                    
                }
               
                 
                    console.log(recordset)

                     return resolve(recordset)
           
        })
        })
        return  reordset
    } catch (error) {
            console.log(error)
    }
}


export async  function findAllDetailProduct(){
    try {
        const conn=mysql.createConnection(database)
        var listDetailProduct:Array<DetailProduct>=[]
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select ProductDetail.*,Product.Name from ProductDetail inner join Product on ProductDetail.ID_Product=Product.ID_Product",(err,recordset)=>{
                if(err){
                   listDetailProduct=undefined
                   return reject(listDetailProduct)
                    
                }
                for(let i=0;i<recordset.length;i++){
                    listDetailProduct.push(Object.assign(new DetailProduct(),recordset[i]))
                }

                return resolve(listDetailProduct)
            })
        })
        return listDetailProduct
    } catch (error) {
        console.log(error)
    }

}
export async  function findAllDetailSameIDProduct(id){
    try {
        const conn=mysql.createConnection(database)
        var listDetailProduct:Array<DetailProduct>=[]
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select ProductDetail.*,Product.* from ProductDetail inner join Product on ProductDetail.ID_Product=Product.ID_Product where Product.ID_Product=?",[id],(err,recordset)=>{
                if(err){
                   listDetailProduct=undefined
                   return reject(listDetailProduct)
                    
                }
                for(let i=0;i<recordset.length;i++){
                    listDetailProduct.push(Object.assign(new DetailProduct(),recordset[i]))
                }

                return resolve(listDetailProduct)
            })
        })
        return listDetailProduct
    } catch (error) {
        console.log(error)
    }

}
export  async function findDetailProductByID(id){
    try {
        const conn=mysql.createConnection(database)
        var detailProduct:DetailProduct=undefined
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("select Product.Name,ProductDetail.* from ProductDetail inner join Product on ProductDetail.ID_Product=Product.ID_Product  where id_detail=?",[id],(err,recordset)=>{
                if(err){
                  
                   return reject(detailProduct)
                    
                }
               
                    detailProduct=Object.assign(new DetailProduct(),recordset[0])
              

                     return resolve(detailProduct)
           
        })
        })
        return detailProduct
    }
        catch (error) {
             console.log(error)
    }
}

export async function createDetailProduct(detailproduct:DetailProduct){
    try {
        const conn=mysql.createConnection(database)
        let record=[[detailproduct.getID_Product(),detailproduct.getId_detail(),detailproduct.getColor(),detailproduct.getScreen(),
            detailproduct.getOS(), detailproduct.getChip(),detailproduct.getFrontcamera(),detailproduct.getRearcamera(),detailproduct.getPin(),detailproduct.getPrice(),detailproduct.getImg(),detailproduct.getNumbers()]]
        console.log(record)
        const reordset=await new Promise((resolve,reject)=>{
            conn.query("insert into ProductDetail(ID_Product, id_detail, color, screen, OS, Chip, frontcamera, rearcamera, pin, price, img, numbers) values ?",[record],(err,recordset)=>{
                if(err){
                  console.log(err)
                   return reject(undefined)
                    
                }
               
                 
                    console.log(recordset)

                     return resolve(recordset)
           
        })
        })
        return  reordset
    } catch (error) {
            console.log(error)
    }
}

export function updateModelProduct(detailproduct:ModelProduct){
    try {
        const conn=mysql.createConnection(database)
        console.log(detailproduct)
    return new Promise((resolve,reject)=>{
        conn.query("update  product set Name=?, Brand=?, Describes=?, img=?, ROM=?, id_category=?, Discount=?, Ram=? where ID_Product=?",
        [detailproduct.getName(),detailproduct.getBrand(),detailproduct.getDescribes(),detailproduct.getImg(),detailproduct.getROM(),detailproduct.getId_category(),detailproduct.getDiscount(),detailproduct.getRAM(),detailproduct.getID_Product()]
        ,(err,recordset)=>{
            if(err){
                console.log(err)
               return reject(recordset.affectedRows)
                
            }
            return resolve(recordset.affectedRows)
       
    })
    })
    } catch (error) {
        
    }
}
export function updateDetailProduct(detailproduct:DetailProduct){
        try {
            const conn=mysql.createConnection(database)
       
        return new Promise((resolve,reject)=>{
            conn.query("update productdetail set ID_Product=? , color=?, screen=?, OS=?, Chip=?, frontcamera=?, rearcamera=?, pin=?, price=?, img=?, numbers=? where id_detail=?",
            [detailproduct.getID_Product(),detailproduct.getColor(),detailproduct.getScreen(),detailproduct.getOS(),detailproduct.getChip(),detailproduct.getFrontcamera(),detailproduct.getRearcamera(),detailproduct.getPin(),detailproduct.getPrice(),detailproduct.getImg(),detailproduct.getNumbers(),detailproduct.getId_detail()]
            ,(err,recordset)=>{
                if(err){
                    console.log(err)
                   return reject(recordset.affectedRows)
                    
                }
                return resolve(recordset.affectedRows)
           
        })
        })
        } catch (error) {
            
        }
}


export  function deleteDetailProduct(id){
    try {
        const conn=mysql.createConnection(database)
       
        return new Promise((resolve,reject)=>{
            conn.query("delete from ProductDetail where id_detail=?",[id],(err,recordset)=>{
                if(err){
                    console.log(err)
                   return reject(recordset.affectedRows)
                    
                }
                return resolve(recordset.affectedRows)
           
        })
        })
      
    }
        catch (error) {
             console.log(error)
    }

}

export  function deleteModelProduct(id){
    try {
        const conn=mysql.createConnection(database)
       
        return new Promise((resolve,reject)=>{
            conn.query("delete from Product where ID_Product=?",[id],(err,recordset)=>{
                if(err){
                  
                   return reject(err)
                    
                }
                return resolve(recordset)
           
        })
        })
      
    }
        catch (error) {
             console.log(error)
    }

}

