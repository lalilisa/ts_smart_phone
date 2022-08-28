export class DetailProduct{
    private Name:string;
    private ID_Product:number
    private id_detail:number
    private color:string
    private screen:string
    private OS:string
    private Chip:string
    private frontcamera:string
    private rearcamera:string
    private pin:string
    private price:number
    private img:string
    private numbers:number
    
    public getName(): string {
        return this.Name;
    }

    public setName(Name: string): void {
        this.Name = Name;
    }

    public getID_Product(): number {
        return this.ID_Product;
    }

    public setID_Product(ID_Product: number): void {
        this.ID_Product = ID_Product;
    }

    public getId_detail(): number {
        return this.id_detail;
    }

    public setId_detail(id_detail: number): void {
        this.id_detail = id_detail;
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public getScreen(): string {
        return this.screen;
    }

    public setScreen(screen: string): void {
        this.screen = screen;
    }

    public getOS(): string {
        return this.OS;
    }

    public setOS(OS: string): void {
        this.OS = OS;
    }

    public getChip(): string {
        return this.Chip;
    }

    public setChip(Chip: string): void {
        this.Chip = Chip;
    }

    public getFrontcamera(): string {
        return this.frontcamera;
    }

    public setFrontcamera(frontcamera: string): void {
        this.frontcamera = frontcamera;
    }

    public getRearcamera(): string {
        return this.rearcamera;
    }

    public setRearcamera(rearcamera: string): void {
        this.rearcamera = rearcamera;
    }

    public getPin(): string {
        return this.pin;
    }

    public setPin(pin: string): void {
        this.pin = pin;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getImg(): string {
        return this.img;
    }

    public setImg(img: string): void {
        this.img = img;
    }

    public getNumbers(): number {
        return this.numbers;
    }

    public setNumbers(numbers: number): void {
        this.numbers = numbers;
    }

}