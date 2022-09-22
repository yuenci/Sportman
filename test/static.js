class St {
    static a = 111;
    static sayHi() {
        console.log(`this is ${this.a}`);
    }
}


St.sayHi();