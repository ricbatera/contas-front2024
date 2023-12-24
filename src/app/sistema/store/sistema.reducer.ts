import { createReducer, on } from "@ngrx/store";
import { IFiltrosState, IMenuSelected,  } from "./sistema.state";
import { setMenuSelected, setMesAnoInicialFinal, setTabMenu } from "./sistema.actions";

export const mesAnoInitial: IFiltrosState ={
    firstLoad: true,
    mesAno: {
        mesStart: 0,
        anoStart: 0,
        mesEnd: 0,
        anoEnd: 0
    },
    devedorId: -1,
    status: "",
    tagId: -1,
    anosSaidaLoaded: [],
    mesesSaidaLoaded: [],
    anosEntradaLoaded: [],
    mesesEntradaLoaded: []
}

export const filtrosFeatureKey = 'filtrosState';

export const filtrosReducer = createReducer(mesAnoInitial,
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