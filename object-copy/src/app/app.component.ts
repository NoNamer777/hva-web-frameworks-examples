import {Component, OnInit} from '@angular/core';
import {Address, Customer, Order} from './model/order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  order: Order;
  orderCopy: Order;

  ngOnInit(): void {
    const deliveryAddr: Address = new Address();
    deliveryAddr.street = 'Zuidpolderstraat';
    deliveryAddr.number = '184';
    deliveryAddr.postCode = '2032PG';
    deliveryAddr.city = 'Haarlem';

    const cust: Customer = new Customer();
    cust.bsn = 9000;
    cust.name = 'John Somers';

    this.order = new Order();
    this.order.id = 1000;
    this.order.customer = cust;
    this.order.deliveryAddress = deliveryAddr;

  }

  performCopyAssign() {
    this.orderCopy =  Object.assign(new Order(), this.order);
  }

  performCopyJSONParser() {
    this.orderCopy = JSON.parse(JSON.stringify(this.order));
  }

  performTrueCopy() {
    this.orderCopy = Order.trueCopy(this.order);
  }

  showOrderInfo() {
    alert(this.orderCopy.getOrderInfo());
  }

}
