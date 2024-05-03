import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  public productFrom!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productFrom = this.fb.group({
      name: this.fb.control('', Validators.required),
      price: this.fb.control(0, Validators.required),
      checked: this.fb.control(false)
    })

  }


  saveProduct() {
    let product: Product = this.productFrom.value;
    this.productService.createProduct(product).subscribe(
      {
        next: (data: Product) => {
          alert(JSON.stringify(data));
        }
      }
    )
  }
}
