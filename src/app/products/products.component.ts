import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {AsyncPipe, NgForOf} from "@angular/common";
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

  public products: Array<Product> = [];
  public keyword: string = '';
  totalPages: number = 0;
  currentPage: number = 0;
  pages : number[] = new Array(this.totalPages);
  pageSize: number = 3;

  ngOnInit(): void {
    this.totalPages = 1;
    this.getProducts()
  }
   getProducts() {
    this.productsService.getProducts(this.currentPage, this.pageSize, this.keyword).subscribe(
      response => {
        this.products = response.body as Product[];
        let totalProducts : number = parseInt(response.headers.get('X-Total-Count')!);
        console.log("totalProducts", totalProducts);
        this.totalPages = Math.ceil(totalProducts / this.pageSize);
        console.log("totalPages", this.totalPages);
       if (this.totalPages === 0) {
          this.totalPages = 1;
        }
      }
    )
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
 this.products = this.products.filter(product => product.id !== id);
      }
    )

  }


  searchProducts(){
    //console.log(page , size);
   this.getProducts();
  }


  changePage(page: any) {
    this.currentPage = page;
    this.getProducts();
  }

  protected readonly Array = Array;
}
