import Item from "@/domain/entity/Item";
import Order from "@/domain/entity/Order"

test("Deve criar um pedido e calcular o total", function () {
  const order= new Order();
  order.addItem(new Item(1,"Guitarra", 1000, "R$ 1.000,00"));
  order.addItem(new Item(2,"Amplificador", 5000, "R$ 5.000,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  const total = order.getTotal();
  expect(total).toBe(6090);
})

test("Deve criar um pedido com vários itens duplicados e eles devem ser agrupados", function () {
  const order= new Order();
  order.addItem(new Item(1,"Guitarra", 1000, "R$ 1.000,00"));
  order.addItem(new Item(2,"Amplificador", 5000, "R$ 5.000,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  order.addItem(new Item(3,"Cabo", 30, "R$ 30,00"));
  expect(order.orderItems).toHaveLength(3);
  expect(order.orderItems[2].quantity).toBe(3);
  expect(order.orderItems[2].getPrice()).toBe(90);
})