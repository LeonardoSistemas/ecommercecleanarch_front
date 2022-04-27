import HttpClient from "@/infra/HttpClient";
import ItemsService from "@/service/ItemsService";
import OrdersService from "@/service/OrdersServices";

export default class ServiceFactory {

    constructor(readonly httpClient : HttpClient, readonly baseUrl : string){}

    createItemsService() : ItemsService {
        return new ItemsService(this.httpClient, this.baseUrl);
    }

    createOrdersService() : OrdersService {
        return new OrdersService(this.httpClient, this.baseUrl);
    }
}