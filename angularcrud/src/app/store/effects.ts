import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginserviceService } from '../services/loginservice.service';
import * as actions from './action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);
  private loginservice = inject(LoginserviceService);
  private router = inject(Router);

  userRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.userRegistration),
      switchMap((action) =>
        this.loginservice.signupUser(action.user).pipe(
          map((data) => {
            localStorage.setItem('token', data.token);
            return actions.userRegistrationSuccess({ user: data.user });
          }),
          catchError((err) => of(actions.userRegistrationError({ error: err })))
        )
      )
    )
  );

  userRegistrationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.userRegistrationSuccess),
      tap(() => {
        this.router.navigate(['/login']);
      })
    ), {dispatch: false}
  );



  userLogin$=createEffect(()=>
    this.actions$.pipe(
        ofType(actions.userLogin),
        switchMap((action)=>
            this.loginservice.loginUser(action.user).pipe(
                map((data:any)=>{
                    return actions.userLoginSuccess({token:data.token,email:data.email})
                }),
                catchError((err)=> of(actions.userLoginFailure({error:err})))
            )
        )
    )
)


userLoginSuccess$=createEffect(()=>
     this.actions$.pipe(
      ofType(actions.userLoginSuccess),
      tap((action)=>{
        localStorage.setItem('token',action.token)
        localStorage.setItem('email',action.email)
        this.router.navigate(['/home'])
      })
     ),{dispatch:false}
)


userLogout$=createEffect(()=>
  this.actions$.pipe(
    ofType(actions.userLogout),
    tap(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    })
  ),{dispatch:false}
)

}
