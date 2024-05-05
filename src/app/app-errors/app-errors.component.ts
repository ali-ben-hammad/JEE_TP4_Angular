import { Component } from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-app-errors',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {

  constructor(public stateService: AppStateService) {
  }

  ngOnInit(): void {
  }

}
