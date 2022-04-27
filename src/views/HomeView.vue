<script setup lang="ts">
import {onMounted, reactive} from 'vue';
import Order from '@/domain/entity/Order';
import Item from '@/domain/entity/Item';
import FormatterService from '@/service/FormatterService';


const { serviceFactory} = defineProps(["serviceFactory"]);

const items : Item[] = reactive([]);
const itemsIndex: { [idItem: number]: Item } = reactive({});
const order : Order = reactive(new Order());
const formatMoney = FormatterService.formatMoney;

const placeOrder = async function (order : Order) {
  const ordersService = serviceFactory.createOrdersService();
  const output = await ordersService.placeOrder(order);
  order.setCode(output.code);
}


onMounted(async()=>{
  const itemsService = serviceFactory.createItemsService();
  const itemsData = await itemsService.getItems();
  for(const itemData of itemsData) {
    items.push(itemData);
    itemsIndex[itemData.idItem] = itemData;
  }

})

</script>

<template>
  <div class="row">
    <div class="col-md-8 main">
    {{itemsIndex}} 
      <div class="row">
        <div class="col-md-4" v-for="item in items">
        <div class="card card-default text-center">
          <span>{{item.description}}</span>
          <h5>{{item.formattedPrice}}</h5>
          <br/>
          <button class="btn btn-info" @click="order.addItem(item)">Buy</button>
        </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 order">
      <h5>Order</h5>
      <hr/>
      <div v-for="orderItem in order.orderItem">
        <div class="row">
          <div class="col-md-2">
            {{orderItem.quantity}} 
          </div>
          <div class="col-md-5">
            {{itemsIndex[orderItem.idItem].description}} 
          </div>
          <div class="col-md-3">
            {{formatMoney(orderItem.getPrice())}} 
          </div>
          <div class="col-md-2">
            <span class="fa fa-minus" @click="order.deleteItem(orderItem)"></span> 
          </div>
        </div>
      </div>
      <hr/>
      <h5>{{formatMoney(order.total)}}</h5>
      <br/>
      <input type="text" class="form-control" v-model="order.cpf"/>
      <br/>
      <button class="btn btn-success btn-lg" @click="placeOrder(order)">Place Order </button>
      {{order}}
    </div>
  </div>
</template>

<style>
.main {
  padding: 20px;
}
.card {
  padding: 20px;
}
.order {
  padding: 20px;
  background-color: #DDD;
  min-height: 100vh;
}
</style>
