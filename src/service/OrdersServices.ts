import Order from "@/domain/entity/Order";
import HttpClient from "@/infra/HttpClient";

export default class OrdersService {
    constructor(readonly httpCliente : HttpClient, readonly baseUrl: string) {}

    async placeOrder (order : Order) {
        const output = await this.httpCliente.post(`${this.baseUrl}/order`, order);
        return output;
    }
}