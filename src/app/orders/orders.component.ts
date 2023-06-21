import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerHttpService } from '../Services/server-http.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private serverHttp: ServerHttpService, private router: Router) {}
  public orders: Order[] = [];
  ngOnInit(): void {
    this.getOrderList();
  }

  public getOrderList() {
    this.serverHttp.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }
  public addNewOrder() {
    this.router.navigate(['/orders/order-form']);
  }
  public editOrder(id: string) {
    this.router.navigate(['/orders/order-form', id]);
  }
  public deleteOrder(id: string) {
    this.serverHttp.deleteOrder(id).subscribe((data) => {
      this.getOrderList();
    });
  }
}
