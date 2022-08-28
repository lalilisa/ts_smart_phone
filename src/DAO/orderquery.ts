import mysql from 'mysql';
import { database } from '../configDB';
import { Order } from '../Model/Order';
import { DetailProduct } from '../Model/DetailProduct';
import { createOrderModel } from '../Model/createOrder';


export async function findOrderByUsername(username:string){
    try {
        const conn=mysql.createConnection(database);
        var listOrderProduct:Array<Order>=[]
        const sql=`select p.Username,Product.Name,p.id_order,ProductDetail.*,p.numbers from ProductDetail inner join Product on ProductDetail.ID_Product=Product.ID_Product inner join (select Orders.Username,OrderDetail.* from Orders,OrderDetail where Orders.id_order=OrderDetail.id_order and Orders.Username=?) as p 
        on ProductDetail.id_detail=p.ID_Productdetail`
        await new Promise((resolve,reject)=>{
            conn.query(sql,[username],(err,result)=>{
                if(err){
                    return reject(listOrderProduct)
                }
                    let order=new Order()
                    let detailproduct=new DetailProduct()
                    let listdetail:Array<DetailProduct>=new Array<DetailProduct>()
                    for(let i=0;i<result.length;i++){
                        order.setUsername(result[i].Username)
                        order.setId_order(result[i].id_order)                       
                        detailproduct.setID_Product(result[i].id_order)
                        detailproduct.setId_detail(result[i].id_detail)
                        detailproduct.setColor(result[i].color)
                        detailproduct.setScreen(result[i].screen)
                        detailproduct.setOS(result[i].OS)
                        detailproduct.setChip(result[i].Chip)
                        detailproduct.setFrontcamera(result[i].frontcamera)
                        detailproduct.setRearcamera(result[i].rearcamera)
                        detailproduct.setPrice(result[i].price)
                        detailproduct.setImg(result[i].img)
                        detailproduct.setNumbers(result[i].numbers)
                        detailproduct.setName(result[i].Name)
                        listdetail.push(detailproduct)
                       
                        listOrderProduct.push(order)
                    }
                    order.setListProductOrder(listdetail)
                    return resolve(listOrderProduct)
            })
        })
        return listOrderProduct
    } catch (error) {
        console.log(error)
    }
}

async function dataInsertOrderDetail(listdata:any,id_order:number){
    try {
        let id_orderdetail=await countRowOrderDetail();
 
        let setrecord=[]
        for(let i=0;i<listdata.length;i++){
            setrecord.push([Number(id_orderdetail)+1+i,id_order,listdata[i].id_detail,listdata[i].ID_Product,listdata[i].color,listdata[i].numbers,listdata[i].price])
        }
        return setrecord
    } catch (error) {
        console.log(error)
    }
}

export async function createOrders(orderdata:createOrderModel){
    try {
        const conn=mysql.createConnection(database);
        const sql="insert into Orders(Username, total, status, date_order, address) values (?,?,?,?,?)"
        return new Promise((resolve,reject)=>{
            conn.query(sql,[orderdata.getUsername(),orderdata.getTotalprice(),0,orderdata.getDateOrder(),orderdata.getAddress()],(err,result)=>{
                if(err){
                    console.log(err)
                    return reject(err)
                }
                return resolve(result)
            })
        }).then(async ()=>{
            let last_idoder=await findLastIdOder(orderdata.getUsername())
    
            let listID_Productdetail=orderdata.getList().map(o=>o.getID_Productdetail())
            let listdata:any=await findDetailProductByListId(listID_Productdetail)
            for(let i=0;i<orderdata.getList().length;i++){
                listdata[i]['numbers']=orderdata.getList()[i].getNumbers()
            }
            let datainsertorderdetail=await dataInsertOrderDetail(listdata,Number(last_idoder))
            await conn.query("insert into OrderDetail(id_orderdetail, id_order, ID_Productdetail, ID_Product, color, numbers, price) values ? ",[datainsertorderdetail],(err,result)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log(err)
            })
            return {message:"Success"}
        })
       
   
    } catch (error) {
        console.log(error)
    }
}
export async function findLastIdOder(username:string){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select id_order from Orders where Username=? ORDER BY id_order DESC",[username],(err,result)=>{
                if(err)
                    return reject(undefined)
                if(result.length>0)
                    return resolve(result[0].id_order)
                else 
                    return resolve(0)
            })
        })
    } catch (error) {
        console.log(error)
    }
}
async function findDetailProductByListId(listID:Number[]){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select  ID_Product,id_detail, color, price from ProductDetail where id_detail in (?)",[listID],(err,result)=>{
                if(err)
                    console.log(err)
                else
                     return resolve(result)
            })
        })
    } catch (error) {
        
    }
}
// findProductByListId([1,123]).then(data=>{
//     console.log(data)
// })
async function countRowOrderDetail(){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("select count(id_orderdetail) as 'row_number' from OrderDetail ",(err,result)=>{
                if(err)
                    return reject(err)
                if (result.length>0)
                     return resolve(result[0].row_number)
                return resolve(0)
            })
        })
    } catch (error) {
        
    }
}


export async function updateOrder(username:string, id_order:number){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("update Orders set status=1 where Username=? and id_order=?",[username,id_order],(err,result)=>{
                    if(err){
                        console.log(err)
                        return reject({message:"Chưa Thành công"})
                    }
                    return resolve({message:"Xác thực thành công"})
            })
        })
    } catch (error) {
        console.log(error)
    }
}
export async function deleteOrder(username:string,id_order:number){
    try {
        const conn=mysql.createConnection(database);
        return new Promise((resolve,reject)=>{
            conn.query("delete from Orders where Username=? and id_order=?",[username,id_order],(err,result)=>{
                    if(err){
                        console.log(err)
                        return reject({message:"Chưa Thành công"})
                    }
                    return resolve({message:"Xóa thành công"})
            })
        })
    } catch (error) {
        console.log(error)
    }
}
export async function findAllOrder(){
    try {
        const conn=mysql.createConnection(database);
        var listOrderProduct:Array<Order>=[]
        const sql=`select p.Username,Product.Name,p.id_order,ProductDetail.*,p.numbers,p.status from ProductDetail inner join Product on ProductDetail.ID_Product=Product.ID_Product inner join (select Orders.Username,Orders.status,OrderDetail.* from Orders,OrderDetail where Orders.id_order=OrderDetail.id_order) as p 
        on ProductDetail.id_detail=p.ID_Productdetail`
        await new Promise((resolve,reject)=>{
            conn.query(sql,(err,result)=>{
                if(err){
                    return reject(listOrderProduct)
                }
                    let order=new Order()
                    let detailproduct=new DetailProduct()
                    let listdetail:Array<DetailProduct>=new Array<DetailProduct>()
                    for(let i=0;i<result.length;i++){
                        order.setStatus(Number(result[i].status))
                        order.setUsername(result[i].Username)
                        order.setId_order(result[i].id_order)                       
                        detailproduct.setID_Product(result[i].id_order)
                        detailproduct.setId_detail(result[i].id_detail)
                        detailproduct.setColor(result[i].color)
                        detailproduct.setScreen(result[i].screen)
                        detailproduct.setOS(result[i].OS)
                        detailproduct.setChip(result[i].Chip)
                        detailproduct.setFrontcamera(result[i].frontcamera)
                        detailproduct.setRearcamera(result[i].rearcamera)
                        detailproduct.setPrice(result[i].price)
                        detailproduct.setImg(result[i].img)
                        detailproduct.setNumbers(result[i].numbers)
                        detailproduct.setName(result[i].Name)
                        listdetail.push(detailproduct)
                       
                        listOrderProduct.push(order)
                    }
                    order.setListProductOrder(listdetail)
                    return resolve(listOrderProduct)
            })
        })
        return listOrderProduct
    } catch (error) {
        console.log(error)
    }
}
// findOrderByUsername('kimcuc237').then(data=>{
//     data.forEach(value=>{
//         console.log(value.getListProductOrder())
//     })
// })


findAllOrder().then(data=>{
    console.log(data)
})
