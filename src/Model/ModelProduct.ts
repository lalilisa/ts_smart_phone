export class ModelProduct{
    private ID_Product:number
    private Name:string
    private Brand:string
    private Describes:string
    private img:string
    private RAM:string
    private ROM:string
    private Discount:string
    private id_category:number

    public getID_Product(): number {
        return this.ID_Product;
    }

    public setID_Product(ID_Product: number): void {
        this.ID_Product = ID_Product;
    }

    public getName(): string {
        return this.Name;
    }

    public setName(Name: string): void {
        this.Name = Name;
    }

    public getBrand(): string {
        return this.Brand;
    }

    public setBrand(Brand: string): void {
        this.Brand = Brand;
    }

    public getDescribes(): string {
        return this.Describes;
    }

    public setDescribes(Describes: string): void {
        this.Describes = Describes;
    }

    public getImg(): string {
        return this.img;
    }

    public setImg(img: string): void {
        this.img = img;
    }

    public getRAM(): string {
        return this.RAM;
    }

    public setRAM(RAM: string): void {
        this.RAM = RAM;
    }

    public getROM(): string {
        return this.ROM;
    }

    public setROM(ROM: string): void {
        this.ROM = ROM;
    }

    public getDiscount(): string {
        return this.Discount;
    }

    public setDiscount(Discount: string): void {
        this.Discount = Discount;
    }

    public getId_category(): number {
        return this.id_category;
    }

    public setId_category(id_category: number): void {
        this.id_category = id_category;
    }


   

}