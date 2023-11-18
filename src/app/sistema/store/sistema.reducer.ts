import { createReducer, on } from "@ngrx/store";
import { IMenuSelected, IMesAnoState } from "./sistema.state";
import { setMenuSelected, setMesAnoInicialFinal, setTabMenu } from "./sistema.actions";

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
    on(setMesAnoInicialFinal, (state, {payload})=>{
        return {
        ...state,
        firstLoad: false,
        mesAno: payload
    }})
);

// estado do menu slecionado e suas configurações
export const menuSelectedInitial: IMenuSelected = {
    nome: "",
    tabDefault: 0,
    configs: {
        titulo: "",
        menus: []
    }
}
export const menuSelectedFeatureKey = 'menuState';

export const menuSelectedReducer = createReducer(menuSelectedInitial,
    on(setMenuSelected, (state, {payload})=>({
        ...payload
    })),
    on(setTabMenu, (state, {payload})=>({
        ...state,
        tabDefault: payload
    })),
);