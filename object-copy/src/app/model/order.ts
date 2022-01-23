export class Order {
  id: number;
  customer: Customer;
  deliveryAddress: Address;

  static trueCopy(order: Order): Order {
    const createdOrder: Order = Object.assign(new Order(), order);

    // making a true copy of the delivery address but keeping a reference to the customer (shallow copy)
    createdOrder.deliveryAddress = Address.trueCopy(order.deliveryAddress);

    return createdOrder;
  }

  getOrderInfo(): string {
    return 'order id: ' + this.id + ' customer name' + this.customer.name;
  }

}

export class Customer {
  bsn: number;
  name: string;
}

export class Address {
  id: number;
  street: string;
  number: string;
  postCode: string;
  city: string;

  static trueCopy(address: Address): Address {
    return Object.assign(new Address(), address);
  }

}
