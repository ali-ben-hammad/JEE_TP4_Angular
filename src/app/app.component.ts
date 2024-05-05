import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AppErrorsComponent} from "./app-errors/app-errors.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    NgForOf, RouterLinkActive, AppErrorsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

  title = 'HospitalFront';
  routerOutlet = RouterOutlet;
  actions: Array<any> = [
    {name: 'Home', path: 'home', icon: 'bi-house'},
    {name: 'Products', path: 'products', icon: 'bi-cart'},
    {name: 'New Product', path: 'product', icon: 'bi-plus'},
  ];

}
