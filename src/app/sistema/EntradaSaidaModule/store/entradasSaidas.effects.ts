import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { DatabaseService } from "src/app/services/database.service";
import { doneLoadListaSaidas, loadListaSaidas } from "./entradasSaidas.actions";

@Injectable()
export class ESEffects {
    constructor(private db: DatabaseService, private actions$: Actions) { }

    carregaListaSaidas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListaSaidas),
            switchMap((action) =>
                this.db
                    .getitensSaida(action.payload.mesStart, action.payload.anoStart)
                    .pipe(map((lista) => doneLoadListaSaidas({ payload: lista })))
            )
        )
    );
}