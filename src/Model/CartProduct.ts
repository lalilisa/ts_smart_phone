export class CartDetailProduct{

   private id_cart:number
   private id_cartdetail:number
   private ID_Productdetail:number 
   private ID_Product:number 
   private color:string 
   private name_product:string 
   private img:string
   private single_price:number

    public getId_cart(): number {
        return this.id_cart;
    }

    public setId_cart(id_cart: number): void {
        this.id_cart = id_cart;
    }

    public getId_cartdetail(): number {
        return this.id_cartdetail;
    }

    public setId_cartdetail(id_cartdetail: number): void {
        this.id_cartdetail = id_cartdetail;
    }

    public getID_Productdetail(): number {
        return this.ID_Productdetail;
    }

    public setID_Productdetail(ID_Productdetail: number): void {
        this.ID_Productdetail = ID_Productdetail;
    }

    public getID_Product(): number {
        return this.ID_Product;
    }

    public setID_Product(ID_Product: number): void {
        this.ID_Product = ID_Product;
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public getName_product(): string {
        return this.name_product;
    }

    public setName_product(name_product: string): void {
        this.name_product = name_product;
    }

    public getImg(): string {
        return this.img;
    }

    public setImg(img: string): void {
        this.img = img;
    }

    public getSingle_price(): number {
        return this.single_price;
    }

    public setSingle_price(single_price: number): void {
        this.single_price = single_price;
    }

}