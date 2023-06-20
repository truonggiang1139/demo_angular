import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public productList:Product[]=[]
  constructor(private serverHttp:ServerHttpService) { }

  ngOnInit(): void {
    this.getData()
  }

  public getData(){
    this.serverHttp.getProductList().subscribe((data)=>{
      this.productList=data
      console.log(data);

    })
  }

}
