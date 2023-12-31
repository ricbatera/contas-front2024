import { Component } from '@angular/core';
import { IMenuSelected } from '../../store/sistema.state';
import { Store } from '@ngrx/store';
import { setMenuSelected } from '../../store/sistema.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ItemListaEntradaApi } from 'src/model/general/item-lista-entrada-api';
import { loadListaEntradas } from '../store/entradasSaidas.actions';
import { MesAno } from 'src/model/config/mes-ano';
import { getMesAno } from '../../store/sistema..selectors';
import { getListaEntradasFull } from '../store/entradasSaidas.selectors';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent {
  private unsubscribe = new Subject<void>;
  dataSource$: Observable<ItemListaEntradaApi[]>
  estadoInicial: IMenuSelected ={
    nome: 'entrada',
    tabDefault: 1,
    configs: {
      titulo: '',
      menus: []
    }
  }

  filtroAtual: MesAno ={
    mesStart: 0,
    anoStart: 0,
    mesEnd: 0,
    anoEnd: 0
  }

  constructor(private store:Store){
    store.dispatch(setMenuSelected({payload: this.estadoInicial}));
    store.select(getMesAno).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.filtroAtual = {...res};
      // -> this.store.dispatch(loadListaEntradas({ payload: this.filtroAtual }));
      //this.listenFiltroChanged(`${this.filtroAtual.mesStart}-${this.filtroAtual.anoStart}`);
    });
    this.dataSource$ = store.select(getListaEntradasFull);
  }
  ngOnDestroy() {
    console.log("Encerrando o componente - Entradas");
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
