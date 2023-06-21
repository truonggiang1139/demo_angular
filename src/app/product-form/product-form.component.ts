import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public id: string;
  public productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
  });
  constructor(
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getProduct();
    }
  }
  public getProduct() {
    this.serverHttp.getProduct(this.id).subscribe((data) => {
      for (const controlName in this.productForm.controls) {
        if (controlName) {
          this.productForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }
  private createNewData() {
    const newProduct = {};
    for (const controlName in this.productForm.controls) {
      if (controlName) {
        newProduct[controlName] = this.productForm.controls[controlName].value;
      }
    }
    return newProduct as Product;
  }
  public saveProductForm() {
    if (!this.id) {
      this.serverHttp.addProduct(this.createNewData()).subscribe((data) => {
        this.router.navigate(['productList']);
      });
    } else {
      this.serverHttp
        .editProduct(this.createNewData(), this.id)
        .subscribe((data) => {
          this.router.navigate(['productList']);
        });
    }
  }
}
