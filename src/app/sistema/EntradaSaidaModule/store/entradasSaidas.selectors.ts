import { createFeatureSelector, createSelector } from "@ngrx/store";
import { listaSaidaKey } from "./entradasSaidas.reducer";
import { IItemListaSaida } from "./entradasSaidas.state";
import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";
import { state } from "@angular/animations";
import { filtrosSaidas } from "src/model/config/filtrosSaidas";

const listaSaidaState = createFeatureSelector<IItemListaSaida>(listaSaidaKey);

export const getFirtLoadListaSaidas = createSelector(listaSaidaState, state => state.firstLoad);
export const getLoadingListaSaidas = createSelector(listaSaidaState, state => state.isLoading);
export const getListaSaidasFull = createSelector(listaSaidaState, state => state.data);
export const getListaMesesAnosCarregados = createSelector(listaSaidaState, state => state.mesAnoCarregados);
export const getListaSaidasByFiltro = (filtro: string) => createSelector(listaSaidaState, state => {
    console.log(filtro);
    let lista: ItemListaSaidaApi[] = state.data.filter(item => item.dataVencimento.slice(0, 7) == filtro);
    return lista
});

export const filtaSaidas = (filtros:filtrosSaidas)=> createSelector(listaSaidaState, state=>{
    let result: ItemListaSaidaApi[] = state.data;
    
    if(filtros.classificacao != "Todos"){
        result = state.data.filter(item=> item.classificacaoNome == filtros.classificacao);
    }else if(filtros.devedor != "Todos"){
        result = state.data.filter(item=> item.devedorNome == filtros.devedor);
    }else if(filtros.meiosPagto != "Todos"){
        result = state.data.filter(item=>{ item.saida.meioPagto == filtros.meiosPagto});
    }else if(filtros.status != "Todos"){
        result = state.data.filter(item=> item.situacao == filtros.status);
    }
    return result;
});

export const getListaStatus = createSelector(listaSaidaState, state =>{
    let lista:string[] = state.data.map(e=> e.situacao);
    lista.unshift("Todos");
    let unicos = lista.filter((e, i)=> lista.indexOf(e) === i);
    return unicos;
});
export const getListaClassificacao = createSelector(listaSaidaState, state =>{
    let lista:string[] = state.data.map(e=> e.classificacaoNome);
    lista.unshift("Todos");
    let unicos = lista.filter((e, i)=> lista.indexOf(e) === i);
    return unicos;
});
export const getListaMeiosPagto = createSelector(listaSaidaState, state =>{
    let lista:any[]= state.data.map(e=> e.fatura != null? e.fatura.cartao?.nome: e.saida.meioPagto);
    lista = lista.map(e=> e == 'debito'?'Débito' : e);
    lista.unshift("Todos");
    let unicos = lista.filter((e, i)=> lista.indexOf(e) === i);
    return unicos;
});

