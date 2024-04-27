import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  products: Array<Product> = [];

  ngOnInit(): void {
    this.http.get<Array<Product>>('http://localhost:8089/products')
      .subscribe(
        data => {
          this.products = data;
        });
  }


  onCheckChange($event: Event, product: Product) {
    product.checked = !product.checked;
   this.http.patch(`http://localhost:8089/products/${product.id}`,
     {checked: product.checked}).subscribe({
      next : updatedProduct => {
        this.products.map(p => p.id === product.id ? updatedProduct : p)
      },
     }

   );

  }
}
