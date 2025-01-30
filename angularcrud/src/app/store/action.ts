import { createAction, props } from '@ngrx/store';

export const userRegistration = createAction('[signup component] userRegistration', props<{ user: any }>());

export const userRegistrationSuccess = createAction('[signup component] userRegistrationSuccess',props<{user:any}>())

export const userRegistrationError=createAction('[signup component} userRegistrationError',props<{error:string}>())


export const userLogin=createAction('[login component] userLogin',props<{user:{email:string,password:string}}>())

export const userLoginSuccess=createAction('[login component] userLoginSuccess',props<{token:string,email:string}>())

export const userLoginFailure=createAction('[login component] userLoginError',props<{error:string}>())

export const userLogout=createAction('[login component] userLogout')