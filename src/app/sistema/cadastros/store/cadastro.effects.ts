import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { DatabaseService } from "src/app/services/database.service";
import { loadDevedores, doneLoadDevedores } from "./cadastro.actions";

@Injectable()
export class CadastrosEffects {
    constructor(private db: DatabaseService, private actions$: Actions) { }
    carregaTodasTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDevedores),
            switchMap((action) =>
                this.db
                    .getDevedoresFull()
                    .pipe(map((devedores) => doneLoadDevedores({ payload: devedores })))
            )
        )
    );
}