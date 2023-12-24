import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFiltrosState, IMenuSelected,  } from "./sistema.state";
import { filtrosFeatureKey, menuSelectedFeatureKey,  } from "./sistema.reducer";

const mesAnoState = createFeatureSelector<IFiltrosState>(filtrosFeatureKey);

export const getLoadMesAno = createSelector(mesAnoState, state=> state.firstLoad);
export const getMesAno = createSelector(mesAnoState, state=> state.mesAno);
export const getDevedorId = createSelector(mesAnoState, state=> state.devedorId);
export const getStateFull = createSelector(mesAnoState, state=> state);


//menu selecionado
const menuSelectedState = createFeatureSelector<IMenuSelected>(menuSelectedFeatureKey);

export const getMenuSelectedConfigs = createSelector(menuSelectedState, state=> state);