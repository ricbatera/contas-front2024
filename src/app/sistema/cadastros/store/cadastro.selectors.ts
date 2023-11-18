import { createFeatureSelector, createSelector } from "@ngrx/store";
import { devedorFeatureKey } from "./cadastro.reducer";
import { IDevedorState } from "./cadastro.state";
import { Devedor } from "src/model/general/devedor";

const devedorAnoState = createFeatureSelector<IDevedorState>(devedorFeatureKey);

export const getFirtLoadDevedores = createSelector(devedorAnoState, state=> state.firstLoad);
export const getLoading = createSelector(devedorAnoState, state=> state.isLoading);
export const getDevedoresAtivos = createSelector(devedorAnoState, state=> {
    let lista: Devedor[] = [...state.devedores  .filter(e=> e.status)]
    lista.unshift({id:0, nome: "Eu", status: true})
    return lista;
});