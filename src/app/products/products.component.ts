import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductService} from "../services/product.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductService) {
  }

  public products$!: Observable<Array<Product>> ;
  public keyword: string = '';

  ngOnInit(): void {
    this.getProducts()
  }
   getProducts() {
    this.products$ = this.productsService.getProducts();
   }

  onCheckChange($event: Event, product: Product) {
    this.productsService.checkProduct(product).subscribe({
        next :(updatedProduct : Product) => {
           product.checked = !updatedProduct.checked;
        }
      })
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct({id} as Product).subscribe(
      () => {
        // filter out the deleted product
        this.products$ = this.products$.pipe(
          map((products: Product[]) => products.filter(product => product.id !== id))
        )
      }
    )

  }

  searchProducts(keyword: string) {
    this.products$ =  this.productsService.searchProducts(keyword)
    console.log(this.products$)
  }
}
