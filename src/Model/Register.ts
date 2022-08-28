export class Register{
    private username:string;
    private email:string;
    private phone_number:string;
    private password:string;
    // constructor(username,email,phone_number,password){
    //     this.username=username
    //     this.email=email
    //     this.phone_number=phone_number
    //     this.password=password
    // }
    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPhone_number(): string {
        return this.phone_number;
    }

    public setPhone_number(phone_number: string): void {
        this.phone_number = phone_number;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    
}