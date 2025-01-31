import { createReducer, on } from "@ngrx/store"
import * as actions from './adminaction'

export interface adminState{
    users:any[],
    error:string|null,
    loading:boolean,
    token:string

}

export const initialState:adminState={
    users:[],
    error:null,
    loading:false,
    token:''
}

export const adminReducer=createReducer(
    initialState,
    on(actions.adminLoginSuccess,(state,{token})=>{
        return{
            ...state,token,loading:false
        }
    }),
    on(actions.adminLoginFailure,(state,{error})=>{
        console.log('redddddd', error);
        
        return{
            ...state,error
        }
    }),
    on(actions.getallusersSuccess,(state,{users})=>{
        return {
            ...state,users
        }
    }),
    on(actions.addUser,(state,{user})=>{
        return {
            ...state,user
        }
    }),
    on(actions.addUserFailure,(state,{error})=>{
        return {
            ...state,error
        }
    }),
    on(actions.editUserSuccess,(state,{user})=>{
        return {
            ...state,user
        }
    }),
    on(actions.editUserFailure,(state,{error})=>{
        return {
            ...state,error
        }
    }),
    on(actions.deleteUserSuccess,(state,{email})=>{
        return {
            ...state,
            users:state.users.filter((item)=>item.email!==email)
           
        }
    }),
    on(actions.deleteUserFailure,(state,{error})=>{
        return {
            ...state,error
        }
    })

)