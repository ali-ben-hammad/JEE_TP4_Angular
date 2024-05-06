import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() {
  }

  public appState: AppState = {
    products: [],
    keyword: '',
    totalPages: 0,
    currentPage: 1,
    pages: [],
    pageSize: 3,
    loading: false,
    status: 'LOADING',
    errorMessage: 'this is an error message'

  }
  public setAppState(state:any){
    this.appState={...this.appState, ...state}
  }
}

interface AppState {
  products: Product[];
  keyword: string;
  totalPages: number;
  currentPage: number;
  pages: number[];
  pageSize: number;
  loading: boolean;
  status: string;
  // errorMessage of type error
  errorMessage: any;
}
