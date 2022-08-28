export class Checkout{
    private id_checkoutdetail:number
    private id_checkout:number
    private id_cartdetail:number
    private ID_Productdetail:number
    private ID_Product:number
    private color:string
    private name_product:string
    private img:string
    private single_price:number
    private numbers:number

    public getId_checkoutdetail(): number {
        return this.id_checkoutdetail;
    }

    public setId_checkoutdetail(id_checkoutdetail: number): void {
        this.id_checkoutdetail = id_checkoutdetail;
    }

    public getId_checkout(): number {
        return this.id_checkout;
    }

    public setId_checkout(id_checkout: number): void {
        this.id_checkout = id_checkout;
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

    public getNumbers(): number {
        return this.numbers;
    }

    public setNumbers(numbers: number): void {
        this.numbers = numbers;
    }

}