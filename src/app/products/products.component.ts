import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {ProductService} from "../services/product.service";
import {product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  implements  OnInit {
  public products : Array<product>=[];
  public keyword : string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;


  constructor(private productService:ProductService,
              private  router : Router) {
  }
  ngOnInit() {
       this.searchProducts();
  }

  searchProducts(){
    this.productService.searchProducts( this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next : (resp) =>  {
          this.products=resp.body as product[];
          let totalProducts : number=parseInt(resp.headers.get('x-total-count')!);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
            if (totalProducts %  this.pageSize !=0 ){
              this.totalPages = this.totalPages+1;
            }

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


  handleGotoPage(page: number) {

    this.currentPage=page;
    this.searchProducts();
  }

  handleUpdate(product: product) {
    this.router.navigateByUrl(`/updateProduct/${product.id}`)
  }
}
