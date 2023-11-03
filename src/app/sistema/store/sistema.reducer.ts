import { createReducer, on } from "@ngrx/store";
import { IMesAnoState } from "./sistema.state";
import { setMesAnoInicialFinal } from "./sistema.actions";

export const mesAnoInitial: IMesAnoState ={
    firstLoad: true,
    mesAno: {
        mesStart: 0,
        anoStart: 0,
        mesEnd: 0,
        anoEnd: 0
    }
}

export const mesAnoFeatureKey = 'mesAnoState';

export const mesAnoReducer = createReducer(mesAnoInitial,
    on(setMesAnoInicialFinal, (state, {payload})=>({
        ...state,
        firstLoad: false,
        mesAno: payload
    }))
);