import { createFeatureSelector, createSelector } from "@ngrx/store";
import { listaSaidaKey } from "./entradasSaidas.reducer";
import { IItemListaSaida } from "./entradasSaidas.state";

const listaSaidaState = createFeatureSelector<IItemListaSaida>(listaSaidaKey);

export const getFirtLoadListaSaidas = createSelector(listaSaidaState, state=> state.firstLoad);
export const getLoadingListaSaidas = createSelector(listaSaidaState, state=> state.isLoading);
export const getListaSaidasFull = createSelector(listaSaidaState, state=> state.data);
export const getListaMesesAnosCarregados = createSelector(listaSaidaState, state=> state.mesAnoCarregados);