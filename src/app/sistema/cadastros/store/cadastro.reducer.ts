import { createReducer, on } from "@ngrx/store";
import { doneLoadDevedores, loadDevedores } from "./cadastro.actions";
import { IDevedorState } from "./cadastro.state";

export const devedorFeatureKey = 'devedorState';
export const devedorState:IDevedorState ={
    isLoading: false,
    firstLoad: true,
    devedores: []
}

export const devedorReducer = createReducer(devedorState,
    on(loadDevedores, (state)=>{
        return {
        ...state,
        isLoading: true,        
    }}),
    on(doneLoadDevedores, (state, {payload})=>{
        return{
            ...state,
            isLoading: false,
            firstLoad: false,
            devedores: payload
        }
    })
);