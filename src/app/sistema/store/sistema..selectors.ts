import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMenuSelected, IMesAnoState } from "./sistema.state";
import { menuSelectedFeatureKey, mesAnoFeatureKey } from "./sistema.reducer";

const mesAnoState = createFeatureSelector<IMesAnoState>(mesAnoFeatureKey);

export const getLoadMesAno = createSelector(mesAnoState, state=> state.firstLoad);
export const getMesAno = createSelector(mesAnoState, state=> state.mesAno);

//menu selecionado
const menuSelectedState = createFeatureSelector<IMenuSelected>(menuSelectedFeatureKey);

export const getMenuSelectedConfigs = createSelector(menuSelectedState, state=> state);