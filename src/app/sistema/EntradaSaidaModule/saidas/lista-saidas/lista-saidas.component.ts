import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuSelected } from '../../../store/sistema.state';
import { setMenuSelected } from '../../../store/sistema.actions';
import { getFiltroSaidas, getFirtLoadListaSaidas, getListaMesesAnosCarregados, getListaSaidasByFiltro, getLoadingListaSaidas, } from '../../store/entradasSaidas.selectors';
import { getMesAno } from '../../../store/sistema..selectors';
import { loadListaSaidas } from '../../store/entradasSaidas.actions';
import { MesAno } from 'src/model/config/mes-ano';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ItemListaSaidaApi } from 'src/model/general/item-lista-saida-api';
import { filtrosSaidas } from 'src/model/config/filtrosSaidas';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-saidas',
  templateUrl: './lista-saidas.component.html',
  styleUrls: ['./lista-saidas.component.css'],
})
export class ListaSaidasComponent {
  private unsubscribe = new Subject<void>;
  isLoading: Observable<boolean>;
  dataSource$!: Observable<ItemListaSaidaApi[]> ;
  filtroAtual: MesAno = {
    mesStart: 0,
    anoStart: 0,
    mesEnd: 0,
    anoEnd: 0
  }
  filtroGeral: filtrosSaidas = {
    devedor: 'Todos',
    status: 'Todos',
    meiosPagto: 'Todos',
    classificacao: 'Todos'
  }
  mesesAnosCarregados: string[] = []

  constructor(private store: Store) {
    store.select(getListaMesesAnosCarregados).pipe(takeUntil(this.unsubscribe)).subscribe(res => this.mesesAnosCarregados = res);
    store.select(getMesAno).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.filtroAtual = { ...res };
      this.listenFiltroChanged(`${this.filtroAtual.mesStart}-${this.filtroAtual.anoStart}`);
    });
    //this.dataSource$ = store.select(getListaSaidasByFiltro(`${this.filtroAtual.anoStart}-${this.filtroAtual.mesStart}`, this.filtroGeral)).pipe(takeUntil(this.unsubscribe));
    store.select(getFiltroSaidas).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.filtroGeral = res;
      this.carregaListaByfiltro();
    });
    this.isLoading = store.select(getLoadingListaSaidas).pipe(takeUntil(this.unsubscribe));
  }

  ngAfterViewInit() {
    
  }

  listenFiltroChanged(param: string) {
    console.log("Validando dados já carregados...");
    let recarrega = true;
    this.mesesAnosCarregados.forEach(e => {
      {
        if (e == param) {
          recarrega = false
        }
      }
    });
    if (recarrega) {
      console.log(`Carregando as saídas de ${this.filtroAtual.mesStart}/${this.filtroAtual.anoStart}.`)
      this.store.dispatch(loadListaSaidas({ payload: this.filtroAtual }));
    };
    this.carregaListaByfiltro();
  }

  ngAfterContentInit(): void {
    //this.listenFiltroChanged(`${this.filtroAtual.mesStart}-${this.filtroAtual.anoStart}`);
  }

  carregaListaByfiltro() {
    console.log("Filtrando dados na tela...")
    this.dataSource$ = this.store.select(getListaSaidasByFiltro(`${this.filtroAtual.anoStart}-${this.filtroAtual.mesStart}`, this.filtroGeral))
      .pipe(takeUntil(this.unsubscribe));      
  }

  ngOnDestroy() {
    console.log("Encerrando o componente - Lista de Saídas");
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
