import HttpClient from "@/infra/HttpClient";
import ItemsService from "@/service/ItemsService";

export default class ServiceFactory {

    constructor(readonly httpClient : HttpClient, readonly baseUrl : string){}

    createItemsService() : ItemsService {
        return new ItemsService(this.httpClient, this.baseUrl);
    }
}