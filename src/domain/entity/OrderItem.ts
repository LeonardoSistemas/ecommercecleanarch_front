export default class OrderItems {    

    constructor(readonly idItem: number, public quantity: number, public itemPrice : number){      
    }

    getPrice() {
        return this.itemPrice * this.quantity;
    }
}