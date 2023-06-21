import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from '../Services/server-http.service';
import { Product } from '../models/product';
import { Order, ProductOrder } from '../models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  public productList: ProductOrder[] = [];
  public selectedCustomer = '';
  public id;
  public customerList = [];
  constructor(
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getCustomer();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getOrder();
    }
  }
  public getOrder() {
    this.serverHttp.getOrder(this.id).subscribe((data) => {
      this.productList.forEach((product) => {
        const existProduct = data.product.find(
          (item) => item.id === product.id
        );
        if (existProduct) {
          Object.assign(product, existProduct);
        }
      });
      console.log(this.productList);

      this.selectedCustomer = data.customerID;
    });
  }
  public getCustomer() {
    this.serverHttp.getStudents().subscribe((data) => {
      this.customerList = data;
    });
  }
  public getProduct() {
    this.serverHttp.getProductList().subscribe((data) => {
      this.productList = data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 0,
        total: 0,
      }));
    });
  }

  public onQuantityChange(id: string) {
    this.productList = this.productList.map((item) =>
      item.id === id ? { ...item, total: item.price * item.quantity } : item
    );
  }
  public decreaseQuantity(id: string) {
    this.productList = this.productList.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            total: item.price * (item.quantity - 1),
          }
        : item
    );
  }
  public increaseQuantity(id: string) {
    this.productList = this.productList.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * (item.quantity + 1),
          }
        : item
    );
  }
  public getTotalOrder() {
    let total = 0;
    this.productList.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  public submitOrder() {
    const productOrder = this.productList.filter((product) => product.quantity);
    let orderData: Order = {
      id: null,
      customerID: this.selectedCustomer,
      product: productOrder,
      total: Number(this.getTotalOrder()),
    };
    if (this.id) {
      this.serverHttp.editOrder(orderData, this.id).subscribe((data) => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.serverHttp.addOrder(orderData).subscribe((data) => {
        this.router.navigate(['/orders']);
      });
    }
  }
}
