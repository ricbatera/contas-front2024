import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuSelected } from '../../store/sistema.state';
import { setMenuSelected } from '../../store/sistema.actions';
import { getFirtLoadListaSaidas, getListaMesesAnosCarregados, getListaSaidasByFiltro, } from '../store/entradasSaidas.selectors';
import { getMesAno } from '../../store/sistema..selectors';
import { loadListaSaidas } from '../store/entradasSaidas.actions';
import { MesAno } from 'src/model/config/mes-ano';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ItemListaSaidaApi } from 'src/model/general/item-lista-saida-api';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})
export class SaidasComponent {

  private unsubscribe = new Subject<void>;

  dataSource$: Observable<ItemListaSaidaApi[]>

  estadoInicial: IMenuSelected = {
    nome: 'saida',
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
  anosCarregados:number[] =[]
  mesesCarregados: number[]= []
  mesesAnosCarregados: string[] = []

  constructor(private store: Store) {
    store.dispatch(setMenuSelected({ payload: this.estadoInicial }));
    store.select(getMesAno).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.filtroAtual = {...res};
      this.listenFiltroChanged(`${this.filtroAtual.mesStart}-${this.filtroAtual.anoStart}`);
    });
    store.select(getListaMesesAnosCarregados).pipe(takeUntil(this.unsubscribe)).subscribe(res=> this.mesesAnosCarregados = res);
    this.dataSource$ = store.select(getListaSaidasByFiltro(`${this.filtroAtual.anoStart}-${this.filtroAtual.mesStart}`)).pipe(takeUntil(this.unsubscribe));
  }
  
  listenFiltroChanged(param: string){
    console.log("Validando dados já carregados...");
    let recarrega = true;
    this.mesesAnosCarregados.forEach(e=>{{
      if(e == param) {
        recarrega = false
      }
    }});    
    if (recarrega) {
      console.log(`Carregando dados. Ano ${this.filtroAtual.anoStart}. Mes ${this.filtroAtual.mesStart}`)
      this.store.dispatch(loadListaSaidas({ payload: this.filtroAtual }));
    };
    this.dataSource$ = this.store.select(getListaSaidasByFiltro(`${this.filtroAtual.anoStart}-${this.filtroAtual.mesStart}`)).pipe(takeUntil(this.unsubscribe));
    //this.dataSource$.subscribe(res=>{console.table(res)})
  }

  ngAfterContentInit(): void {
    
  }

  carregaListaByfiltro(){
    
  }

  ngOnDestroy() {
    console.log("Encerrando o componente - Saídas");
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}