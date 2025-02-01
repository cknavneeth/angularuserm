import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';

export const myinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const store=inject(Store)
  const token=localStorage.getItem('token')

  if (req.url.includes('https://api.cloudinary.com/v1_1')) {
    return next(req); // Directly forward the request without modifying it
  }



  if(token){
    req=req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status===400){
        // store.dispatch(userLogout())
      }
      console.log('jjjjjjjjjj', error);
      return throwError(()=> new Error(error.error.message))
    })
  )
    
};
