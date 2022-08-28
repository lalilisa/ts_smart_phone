export class User{
    private Username:string;
    private Password:string;
    private Email:string;
    private Address:string;
    private Phonenumber:string;
    private role:number;
    private Name:string;
    private Date:string;

    public getDate(): string {
        return this.Date;
    }

    public setDate(Date: string): void {
        this.Date = Date;
    }

    private img:string;


    public getUsername(): string {
        return this.Username;
    }

    public setUsername(Username: string): void {
        this.Username = Username;
    }

    public getPassword(): string {
        return this.Password;
    }

    public setPassword(Password: string): void {
        this.Password = Password;
    }

    public getEmail(): string {
        return this.Email;
    }

    public setEmail(Email: string): void {
        this.Email = Email;
    }

    public getAddress(): string {
        return this.Address;
    }

    public setAddress(Address: string): void {
        this.Address = Address;
    }

    public getPhonenumber(): string {
        return this.Phonenumber;
    }

    public setPhonenumber(Phonenumber: string): void {
        this.Phonenumber = Phonenumber;
    }

    public getRole(): number {
        return this.role;
    }

    public setRole(role: number): void {
        this.role = role;
    }

    public getName(): string {
        return this.Name;
    }

    public setName(Name: string): void {
        this.Name = Name;
    }

  

    public getImg(): string {
        return this.img;
    }

    public setImg(img: string): void {
        this.img = img;
    }

}