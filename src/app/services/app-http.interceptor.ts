import { HttpInterceptorFn } from '@angular/common/http';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  let request = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + 'token')
  });
  //console.log('Request   intercept ', request);
  return next(request);
};
