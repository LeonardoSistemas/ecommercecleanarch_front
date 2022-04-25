import Item from "./Item";
import OrderItems from "./OrderItem";

export default class Order {
    orderItems : OrderItems [];
    total : number;

    constructor() {
        this.orderItems = [];
        this.total = 0;
    }

    addItem (item : Item) {
        const orderItem = this.orderItems.find(orderItem => orderItem.idItem === item.idItem);
        if(orderItem){
          orderItem.quantity ++;
        }else{
        this.orderItems.push(new OrderItems(item.idItem, 1, item.price));
        }
        this.total += item.price;
    }

    getTotal () {
        return this.total;
    }
}