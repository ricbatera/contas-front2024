import { createReducer, on } from "@ngrx/store";
import { doneLoadListaSaidas, loadListaSaidas } from "./entradasSaidas.actions";
import { IItemListaSaida } from "./entradasSaidas.state";
import * as servico from "../../../services/utils.service"

export const listaSaidaKey = 'listaSaidaState';
const listaSaidasState: IItemListaSaida ={
    firstLoad: true,
    isLoading: false,
    data: [],
    mesAnoCarregados: []
}

export const listaSaidaReducer = createReducer(listaSaidasState,
    on(loadListaSaidas, state=>({
        ...state,
        isLoading: true
    })),
    on(doneLoadListaSaidas, (state, {payload})=>{
        let atual = [...state.data];
        console.log("atualizando lista de meses e anos carregados");
        let carregados = [... state.mesAnoCarregados]
        carregados.push(getMesAnoByData(payload[0].dataVencimento))
        payload.forEach(e=> atual.push(e))
        return {
        ...state,
        firstLoad: false,
        isLoading: false,
        data: atual,
        mesAnoCarregados: carregados
    }})
);

const getMesAnoByData =  (param: string): string =>{
    let resul:string = ''
    let data = new Date(param);
    resul = `${data.getMonth()+1}-`
    resul = `${resul}${data.getFullYear()}`
    return resul;
  }