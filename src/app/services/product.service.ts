import { Injectable } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  http: HttpClient) { }
  public searchProducts( keyword:string="",page : number=1, size :number=4) {
    return this.http.get
    (`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe:'response'});
  }
  public checkProduct(product: product):Observable <product>
    {
    return this.http.patch<product>(`http://localhost:8089/products/${product.id}` , {checked:!product.checked});
  }
  public deleteProduct(product: product)
  {
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}` );
  }

  saveProduct(product: product) :Observable<product> {
    return this.http.post<product>(`http://localhost:8089/products/` , product);
  }

  getProductById(productId: number) : Observable<product> {
   return  this.http.get<product>(`http://localhost:8089/products/${productId}`);

  }

  updateProduct(product: product): Observable<product> {
    return  this.http.put<product>(`http://localhost:8089/products/${product.id}`,product);

  }
}
