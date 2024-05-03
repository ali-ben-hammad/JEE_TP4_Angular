import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Product} from "../model/product.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

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

  public getProducts( page: Number = 1, size: Number = 3, keyword: String): Observable<HttpResponse<Product[]>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${id}`);
  }



/*  public searchProducts(keyword: string, page: Number = 1, size: Number = 3): Observable<Product[]> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?q=${keyword}&_page=${page}&_limit=${size}`);
  }

 */
}
