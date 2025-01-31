import { createAction, props } from "@ngrx/store";
import { IUser } from "../../../shared/usermodel";

export const adminLogin=createAction('[adminlogin component] adminLogin',props<{admin:{email:string,password:string}}>())

export const adminLoginSuccess=createAction('[adminlogin component] adminLoginSuccess',props<{token:string}>())

export const adminLoginFailure=createAction('[adminlogin component] adminLoginFailure',props<{error:string}>())


export const getallusers=createAction('[admindashboard component] getallusers')

export const getallusersSuccess=createAction('[admindashboard component] getalluserSuccess',props<{users:any[]}>())

export const getallusersFailure=createAction('[admindashboard component] getallusersFailure',props<{error:string}>())



export const addUser=createAction('[admindashboard component] addUser',props<{user:IUser}>() )

export const addUserSuccess=createAction('[admindashboard component] addUserSuccess',props<{user:IUser}>())

export const addUserFailure=createAction('[admindashboard component] addUserFailure', props<{error:string}>())



export const editUser=createAction('[admin dashboard] editUser',props<{user:{_id: string,name:string,email:string,password:string}}>())

export const editUserSuccess=createAction('[admin dashboard] editUserSuccess',props<{user:IUser}>())

export const editUserFailure=createAction('[admin dashboard] editUserFailure',props<{error:string}>())


export const deleteUser=createAction('[admin dashboard] deleteUser',props<{email:string}>())

export const deleteUserSuccess=createAction('[admin dashboard] deleteUserSuccess',props<{email:string}>())

export const deleteUserFailure=createAction('[admin dashboard] deleteUserSuccess',props<{error:string}>())