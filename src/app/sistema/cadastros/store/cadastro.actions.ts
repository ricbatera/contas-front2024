import { createAction, props } from "@ngrx/store";
import { Devedor } from "src/model/general/devedor";

enum TypesAction {
    loadDevedores = '[CADASTROS] Carrega Lista de devedores',
    doneLoadDevedores ='[CADASTROS] Lista de devedores carregados'
}

export const loadDevedores = createAction(TypesAction.loadDevedores);
export const doneLoadDevedores = createAction(TypesAction.doneLoadDevedores, props<{payload: Devedor[]}>());