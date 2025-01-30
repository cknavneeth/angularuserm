import { createReducer, on } from "@ngrx/store";
import * as action  from './action'

export interface userState{
    users:any|null;
    error:string|null;
    loading:boolean;
}

const initialState:userState={
    users:null,
    error:null,
    loading:false
}


export const userReducer=createReducer(
      initialState,
      on(action.userRegistrationSuccess,(state,{user})=>{
      return {...state,user}
    } ),
    on(action.userRegistrationError,(state,{error})=>{
        return {...state,error}
    }),
    on(action.userLoginSuccess,(state,{token})=>{
        return {...state,token}
    }),
    on(action.userLoginFailure,(state,{error})=>{
        return {...state,error}
    })
)
