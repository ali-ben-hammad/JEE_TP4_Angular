import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public productFrom!: FormGroup;
  productId!: number;
  initialProduct!: Product;

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(
      {
        next: (product: Product) => {
          this.productFrom = this.fb.group({
            name: [product.name, [Validators.required]],
            price: [product.price, [Validators.required]],
            checked: [product.checked, [Validators.required]]
          });
          this.initialProduct = product;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )

  }

  updateProduct() {
    let product: Product = this.productFrom.value;
    product.id = this.productId;
    this.productService.updateProduct(product).subscribe(
      {
        next: (data: Product) => {
          alert(JSON.stringify(data));
        }
      }
    )
  }

  resetForm() {
    this.productFrom.reset(this.initialProduct);
  }

  back() {
    // go back to the previous page
    this.location.back();

  }
}
