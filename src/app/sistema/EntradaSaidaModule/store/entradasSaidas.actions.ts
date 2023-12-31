import { createAction, props } from "@ngrx/store";
import { filtrosSaidas } from "src/model/config/filtrosSaidas";
import { MesAno } from "src/model/config/mes-ano";
import { ItemListaEntradaApi } from "src/model/general/item-lista-entrada-api";
import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";

enum TypesAction {
    loadListaSaidas = '[ENTRADAS E SAIDAS] Carrega lista de saídas',
    loadListaEntradas = '[ENTRADAS E SAIDAS] Carrega lista de entradas',
    doneLoadListaSaidas = '[ENTRADAS E SAIDAS] Carregado: lista de saídas',
    doneLoadListaEntradas = '[ENTRADAS E SAIDAS] Carregado: lista de entradas',
    getListaMesesCarregados = '[ENTRADAS E SAIDAS] Obtendo a lista de meses das lista de saidas já carregadas',
    getListaAnosCarregados = '[ENTRADAS E SAIDAS] Obtendo a lista de anos das lista de saidas já carregadas',
    updateFiltroListaSaidas = '[ENTRADAS E SAIDAS] Atualziando filtro das saídas',
}
export const loadListaSaidas = createAction(TypesAction.loadListaSaidas, props<{payload:MesAno}>());
export const loadListaEntradas = createAction(TypesAction.loadListaEntradas, props<{payload:MesAno}>());
export const doneLoadListaSaidas = createAction(TypesAction.doneLoadListaSaidas, props<{payload: ItemListaSaidaApi[]}>());
export const doneLoadListaEntradas = createAction(TypesAction.doneLoadListaEntradas, props<{payload: ItemListaEntradaApi[]}>());
export const updateFiltroListaSaidas = createAction(TypesAction.updateFiltroListaSaidas, props<{payload: filtrosSaidas}>());
