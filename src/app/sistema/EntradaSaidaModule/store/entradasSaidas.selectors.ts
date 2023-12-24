import { createFeatureSelector, createSelector } from "@ngrx/store";
import { listaSaidaKey } from "./entradasSaidas.reducer";
import { IItemListaSaida } from "./entradasSaidas.state";
import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";

const listaSaidaState = createFeatureSelector<IItemListaSaida>(listaSaidaKey);

export const getFirtLoadListaSaidas = createSelector(listaSaidaState, state => state.firstLoad);
export const getLoadingListaSaidas = createSelector(listaSaidaState, state => state.isLoading);
export const getListaSaidasFull = createSelector(listaSaidaState, state => state.data);
export const getListaMesesAnosCarregados = createSelector(listaSaidaState, state => state.mesAnoCarregados);
export const getListaSaidasByFiltro = (filtro: string) => createSelector(listaSaidaState, state => {
    console.log(filtro);
    let lista: ItemListaSaidaApi[] = state.data.filter(item => item.dataVencimento.slice(0, 7) == filtro);
    return lista
})