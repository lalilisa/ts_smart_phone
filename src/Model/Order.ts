import { DetailProduct } from "./DetailProduct";

export class Order{
    private username:string;
    private id_order:number;
    private listProductOrder:Array<DetailProduct>;
    private status:number

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number): void {
        this.status = status;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getId_order(): number {
        return this.id_order;
    }

    public setId_order(id_order: number): void {
        this.id_order = id_order;
    }

    public getListProductOrder(): Array<DetailProduct> {
        return this.listProductOrder;
    }

    public setListProductOrder(listProductOrder: Array<DetailProduct>): void {
        this.listProductOrder = listProductOrder;
    }


 


}