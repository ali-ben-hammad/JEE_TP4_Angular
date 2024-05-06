import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs";


export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(AppStateService);
  stateService.setAppState({status: 'LOADING', loading: true});


  let request = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + 'token')
  });
  //console.log('Request   intercept ', request);
  return next(request).pipe(
    finalize(() => {
        stateService.setAppState({status: 'LOADED',loading: false})
      }
    )
  );
};
