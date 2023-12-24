import { Action, createAction, props } from "@ngrx/store";
import { MesAno } from "src/model/config/mes-ano";
import { IMenuSelected } from "./sistema.state";

enum TypesAction {
    mesAno = '[SISTEMA] Setando mês e ano inicial e final',
    menuSelectec = '[Sistema] Menu slecionado e suas configurações',
    setTabMenu = '[Sistema] Tab selecionada no menu',
    updateAnoStartList = '[Sistema] Add Ano Start ',
}

export const setMesAnoInicialFinal = createAction(TypesAction.mesAno, props<{payload: MesAno}>());
export const setAnoInicial = createAction(TypesAction.mesAno, props<{payload: MesAno}>());
export const setAnoFinal = createAction(TypesAction.mesAno, props<{payload: MesAno}>());
export const setMesInicial = createAction(TypesAction.mesAno, props<{payload: MesAno}>());
export const setMesFinal = createAction(TypesAction.mesAno, props<{payload: MesAno}>());
export const setMenuSelected = createAction(TypesAction.menuSelectec, props<{payload: IMenuSelected}>());
export const setTabMenu = createAction(TypesAction.setTabMenu, props<{payload: number}>());
export const updateAnoStartList = createAction(TypesAction.updateAnoStartList, props<{payload:number}>());