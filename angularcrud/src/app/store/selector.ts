import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./reducer";


export const selectUserState=createFeatureSelector<userState>('userstate')


export const selectUser=createSelector(
    selectUserState,
    (state)=>state.users
)

export const selectLoading=createSelector(
    selectUserState,
    (state)=>state.loading
)

export const selectError=createSelector(
    selectUserState,
    (state)=>state.error
)

