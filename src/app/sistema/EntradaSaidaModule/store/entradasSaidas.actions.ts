import { createAction, props } from "@ngrx/store";
import { MesAno } from "src/model/config/mes-ano";
import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";

enum TypesAction {
    loadListaSaidas = '[ENTRADAS E SAIDAS] Carrega lista de saídas',
    doneLoadListaSaidas = '[ENTRADAS E SAIDAS] Carregado: lista de saídas',
    getListaMesesCarregados = '[ENTRADAS E SAIDAS] Obtendo a lista de meses das lista de saidas já carregadas',
    getListaAnosCarregados = '[ENTRADAS E SAIDAS] Obtendo a lista de anos das lista de saidas já carregadas',
}
export const loadListaSaidas = createAction(TypesAction.loadListaSaidas, props<{payload:MesAno}>());
export const doneLoadListaSaidas = createAction(TypesAction.doneLoadListaSaidas, props<{payload: ItemListaSaidaApi[]}>());
