
export class Need{
    private ID_Productdetail:number;
    private numbers:number;

    constructor(ID_Productdetail:number,numbers:number){
        this.ID_Productdetail=ID_Productdetail
        this.numbers=numbers
    }
    public getID_Productdetail(): number {
        return this.ID_Productdetail;
    }

    public setID_Productdetail(ID_Productdetail: number): void {
        this.ID_Productdetail = ID_Productdetail;
    }

    public getNumbers(): number {
        return this.numbers;
    }

    public setNumbers(numbers: number): void {
        this.numbers = numbers;
    }

}

// let lists:Need[]=[]
// lists.push(new Need(1,5))
// lists.push(new Need(3,5))
// const s=lists.map(o=>o.getID_Productdetail())
// console.log(s)

export class createOrderModel{
        private username:string;
        private address:string;
        private totalprice:number;
        private list:Array<Need>;
        private dateOrder:string;

    public getDateOrder(): string {
        return this.dateOrder;
    }

    public setDateOrder(dateOrder: string): void {
        this.dateOrder = dateOrder;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getTotalprice(): number {
        return this.totalprice;
    }

    public setTotalprice(totalprice: number): void {
        this.totalprice = totalprice;
    }

    public getList(): Array<Need> {
        return this.list;
    }

    public setList(list: Array<Need>): void {
        this.list = list;
    }

        
}