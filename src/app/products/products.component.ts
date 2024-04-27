import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductService} from "../services/product.service";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductService) {
  }

  products$!: Observable<Array<Product>> ;

  ngOnInit(): void {
    this.getProducts()
  }
   getProducts() {
    this.products$ = this.productsService.getProducts();
   }

  onCheckChange($event: Event, product: Product) {
    this.productsService.checkProduct(product).subscribe({
        next :(updatedProduct : Product) => {
           product.checked = updatedProduct.checked;
        }
      })
  }
}
