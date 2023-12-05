import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {ProductService} from "../services/product.service";
import {product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  implements  OnInit {
  public products : Array<product>=[];
  public keyword : string="";

  constructor(private productService:ProductService) {
  }
  ngOnInit() {
       this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(1,6)
      .subscribe({
        next : data =>  {
          this.products =data
        },
        error : err =>  {
          console.log(err);
        }
      })
    //this.products$=this.productService.getProducts();
  }


  handleCheckProduct(product: product) {
    this.productService.checkProduct(product).subscribe({
      next : updatedProduct => {
        //this.getProducts();
        product.checked=!product.checked;
      }
    })
  }

  handleDelete(product: product) {
    if (confirm("Etes vous sùre ?"))
    this.productService.deleteProduct(product).subscribe({
      next : value => {
      //  this.getProducts();
       this.products= this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts() {
this.productService.searchProducts(this.keyword).subscribe({
  next : value =>{ this.products=value;}
})
  }
}
