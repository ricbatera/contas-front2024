import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMesAnoState } from "./sistema.state";
import { mesAnoFeatureKey } from "./sistema.reducer";

const mesAnoState = createFeatureSelector<IMesAnoState>(mesAnoFeatureKey);

export const getLoadMesAno = createSelector(mesAnoState, state=> state.firstLoad);