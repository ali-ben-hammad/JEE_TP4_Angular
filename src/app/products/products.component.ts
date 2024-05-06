import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {FormsModule} from "@angular/forms";
import {Route} from "@angular/router";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgIf,
    SpinnerComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductService,
    private router: Router,
    public stateService: AppStateService
  ) {
  }


  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService.getProducts(
      this.stateService.appState.currentPage,
      this.stateService.appState.pageSize,
      this.stateService.appState.keyword)
      .subscribe(
        response => {
          this.stateService.appState.products = response.body as Product[];
          let totalProducts: number = parseInt(response.headers.get('X-Total-Count')!);
          console.log("totalProducts", totalProducts);

          this.stateService.appState.totalPages = Math.floor(totalProducts / this.stateService.appState.pageSize);
         // this.stateService.appState.pages =  new Array(this.stateService.appState.totalPages).fill(0).map((x, i) => i);
          console.log("totalPages", this.stateService.appState.totalPages);
          if (this.stateService.appState.totalPages === 0) {
            ++this.stateService.appState.totalPages
          }
        }
      )
  }


  onCheckChange($event: Event, product: Product) {
    this.productsService.checkProduct(product).subscribe({
      next: (updatedProduct: Product) => {
        product.checked = !updatedProduct.checked;
      }
    })
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct({id} as Product).subscribe(
      () => {
        // filter out the deleted product
        this.stateService.appState.products =
          this.stateService.appState.products.filter(product => product.id !== id);
      }
    )

  }


  searchProducts() {
    //console.log(page , size);
    this.getProducts();
  }


  changePage(page: any) {
    console.log("page", page);
    this.stateService.appState.currentPage = page;
    this.getProducts();
  }

  protected readonly Array = Array;

  editProduct(id: number) {
    this.router.navigateByUrl(`/editProduct/${id}`)

  }
}
