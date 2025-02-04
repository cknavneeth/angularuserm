import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './adminaction';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AdminservicesService } from '../../services/adminservices.service';

@Injectable()
export class AdminEffect {
  private actions$ = inject(Actions);
  private adminService = inject(AdminservicesService);
  private router = inject(Router);

  adminLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.adminLogin),
      switchMap((action) => {
        console.log('action di', action);

        return this.adminService.adminLogin(action.admin).pipe(
          map((data) => {
            console.log('data', data);

            return actions.adminLoginSuccess({ token: data.token });
          }),
          catchError((error) => {
            console.log('err', error);
            
            return of(actions.adminLoginFailure({error}));
          })
        );
      })
    )
  );

  adminLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.adminLoginSuccess),
        tap((action) => {
          console.log('tapppppppppp', action);

          localStorage.setItem('admintoken', action.token);
          this.router.navigate(['/admin/dashboard']);
        })
      ),
    { dispatch: false }
  );

  
  getallusers$=createEffect(
    ()=>
        this.actions$.pipe(
            ofType(actions.getallusers),
            mergeMap(()=>{
                return this.adminService.getallusers().pipe(
                    map((data)=>{
                        console.log(data)
                      return  actions.getallusersSuccess({users:data?.users||[]})
                    }),
                    catchError((err)=>{
                       return of( actions.getallusersFailure({error:err}))
            })
                )
            })
        )
  )


  addUser$=createEffect(()=>
    this.actions$.pipe(
      ofType(actions.addUser),
      mergeMap((action)=>{
        return this.adminService.addUser(action.user).pipe(
          map((data:any)=>actions.addUserSuccess({user:data})),
          catchError((err)=>of(actions.addUserFailure({error:err})))
        )
      })
    )
  )



  editUser$=createEffect(()=>
    this.actions$.pipe(
      ofType(actions.editUser),
      mergeMap((action)=>{
        return this.adminService.editUser(action.user).pipe(
          map((editeduser:any)=>actions.editUserSuccess({user:editeduser})),
          catchError((err)=>of(actions.editUserFailure({error:err})))
        )
      })
    )
  )


  deleteUser$=createEffect(()=>
    this.actions$.pipe(
      ofType(actions.deleteUser),
      mergeMap((action)=>{
        return this.adminService.deleteUser(action.email).pipe(
          map((response:any)=>actions.deleteUserSuccess({email:response.email})),
          catchError((err)=>of(actions.deleteUserFailure({error:err})))
        )
      })
    )
  )

  adminlogout$=createEffect(()=>
    this.actions$.pipe(
      ofType(actions.adminlogout),
      tap(()=>{
        localStorage.removeItem('admintoken')
        this.router.navigate(['/admin/login'])
      })
    ),{dispatch:false}
  )

}
