import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    orderItem: OrderItem[];
    total: number;
    cpf?: string;
    code?: string;

    constructor() {
        this.orderItem = [];
        this.total = 0;
        this.cpf = "935.411.347-80";
    }

    addItem(item: Item) {
        const orderItem = this.orderItem.find(orderItem => orderItem.idItem === item.idItem);
        if (orderItem) {
            orderItem.quantity++;
        } else {
            this.orderItem.push(new OrderItem(item.idItem, 1, item.price));
        }
        this.total += item.price;
    }

    getTotal() {
        return this.total;
    }

    deleteItem(orderItem: OrderItem) {
        orderItem.quantity--;
        this.total -= orderItem.itemPrice;
        if (orderItem.quantity === 0) {
            this.orderItem.splice(this.orderItem.indexOf(orderItem), 1);
        }
    }

    setCode(code: string) {
        this.code = code;
    }
}