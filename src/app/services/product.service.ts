import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8089/products', product);
  }
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }

  public deleteProduct(product: Product) {
    return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`);
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }

  public getProducts(): Observable<Product[]> {
    return  this.http.get<Array<Product>>('http://localhost:8089/products')
  }


  public searchProducts(keyword: string) : Observable<Product[]> {
    return this.http.get<Array<Product>>('http://localhost:8089/products').pipe(
      map(products => products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase())))
    );
  }
}
