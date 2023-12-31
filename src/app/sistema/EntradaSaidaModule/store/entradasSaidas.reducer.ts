import { createReducer, on } from "@ngrx/store";
import { doneLoadListaEntradas, doneLoadListaSaidas, loadListaEntradas, loadListaSaidas, updateFiltroListaSaidas } from "./entradasSaidas.actions";
import { IItemListaEntrada, IItemListaSaida } from "./entradasSaidas.state";
import * as servico from "../../../services/utils.service"

export const listaSaidaKey = 'listaSaidaState';
const listaSaidasState: IItemListaSaida = {
    firstLoad: true,
    isLoading: true,
    data: [],
    mesAnoCarregados: [],
    filtroGeral: {
        devedor: "Todos",
        status: "Todos",
        meiosPagto: "Todos",
        classificacao: "Todos"
    }
}

export const listaSaidaReducer = createReducer(listaSaidasState,
    on(loadListaSaidas, state => ({
        ...state,
        isLoading: true
    })),
    on(doneLoadListaSaidas, (state, { payload }) => {
        let atual = [...state.data];
        console.log("atualizando lista de meses e anos carregados");
        let carregados = [...state.mesAnoCarregados]
        carregados.push(getMesAnoByData(payload[0].dataVencimento))
        payload.forEach(e => atual.push(e))
        return {
            ...state,
            firstLoad: false,
            isLoading: false,
            data: atual,
            mesAnoCarregados: carregados
        }
    }),
    on(updateFiltroListaSaidas, (state, {payload})=> ({
        ...state,
        filtroGeral: payload
    }))
);

// funcao para retornar uma data para os filtros
const getMesAnoByData = (param: string): string => {
    let resul: string = ''
    let data = new Date(param);
    resul = `${data.getMonth() + 1}-`
    resul = `${resul}${data.getFullYear()}`
    return resul;
}

export const listaEntradaKey = 'listaEntradasState';
const listaEntradasState: IItemListaEntrada = {
    firstLoad: true,
    isLoading: false,
    mesAnoCarregados: [],
    data: []
}

export const listaEntradaReducer = createReducer(listaEntradasState,
    on(loadListaEntradas, state => ({
        ...state,
        isLoading: true
    })),
    on(doneLoadListaEntradas, (state, { payload }) => {
        let atual = [...state.data];
        console.log("atualizando lista de meses e anos carregados - Entradas");
        let carregados = [...state.mesAnoCarregados]
        carregados.push(getMesAnoByData(payload[0].dataPrevistaRecebimento))
        payload.forEach(e => atual.push(e))
        return {
            ...state,
            firstLoad: false,
            isLoading: false,
            data: atual,
            mesAnoCarregados: carregados
        }
    })
);