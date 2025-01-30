import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adminState } from "./adminreducer";

export const selectadminState=createFeatureSelector<adminState>('adminState')

export const selectadmin=createSelector(
    selectadminState,
    (state)=>state.users
)

export const selectadminerror=createSelector(
    selectadminState,
    (state)=>state.error
)

export const selectadmintoken=createSelector(
    selectadminState,
    (state)=>state.token

)

export const selectadminloading=createSelector(
    selectadminState,
    (state)=>state.loading
)