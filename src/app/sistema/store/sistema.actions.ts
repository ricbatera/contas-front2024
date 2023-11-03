import { Action, createAction, props } from "@ngrx/store";
import { MesAno } from "src/model/config/mes-ano";

enum TypesAction {
    mesAno = '[SISTEMA] Setando mês e ano inicial e final'
}

export const setMesAnoInicialFinal = createAction(TypesAction.mesAno, props<{payload: MesAno}>());