import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ServerHttpService } from '../Services/server-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public productList: Product[] = [];
  constructor(private serverHttp: ServerHttpService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.serverHttp.getProductList().subscribe((data) => {
      this.productList = data;
    });
  }
  public addProduct() {
    this.router.navigate(['productList/product-form']);
  }

  public deleteProduct(id: string) {
    this.serverHttp.deleteProduct(id).subscribe((data) => {
      this.getData();
    });
  }
}
