import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { meses } from 'src/model/general/meses';
import { getDevedorId, getLoadMesAno, getMenuSelectedConfigs, getMesAno } from '../../store/sistema..selectors';
import { MesAno } from 'src/model/config/mes-ano';
import { IMenuSelected } from '../../store/sistema.state';
import { getDevedoresAtivos, getFirtLoadDevedores, getLoadingDevedor } from '../../cadastros/store/cadastro.selectors';
import { loadDevedores } from '../../cadastros/store/cadastro.actions';
import { Devedor } from 'src/model/general/devedor';
import { FiltrosService } from 'src/app/services/filtros.service';
import filtrosType from 'src/model/config/filtros-enum';
import {setMesAnoInicialFinal } from '../../store/sistema.actions';
import { getListaClassificacao, getListaMeiosPagto, getListaStatus } from '../../EntradaSaidaModule/store/entradasSaidas.selectors';
import { filtrosSaidas } from 'src/model/config/filtrosSaidas';
import { updateFiltroListaSaidas } from '../../EntradaSaidaModule/store/entradasSaidas.actions';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit{
  private unsubscribe = new Subject<void>;
  loading = true;
  meses$: Observable<meses[]>;
  anos$: Observable<number[]>;
  devedores$: Observable<Devedor[]>;
  status$: Observable<string[]>;
  tags$: Observable<string[]>;
  meioPagto$: Observable<string[]>;
  mesInicial = new FormControl();
  mesFinal = new FormControl();
  anoInicial = new FormControl();
  anoFinal = new FormControl();
  devedor = new FormControl();
  status = new FormControl();
  tag = new FormControl();
  meioPagto = new FormControl();
  getLoadMesAno: boolean = false;
  menuSelected$: Observable<IMenuSelected>;
  atual: MesAno = {
    mesStart: 0,
    anoStart: 0,
    mesEnd: 0,
    anoEnd: 0
  }
  firstLoad = true;
  menuSelecionado: IMenuSelected = {
    nome: '',
    tabDefault: 0,
    configs: {
      titulo: '',
      menus: []
    }
  }
  filtroGeral: filtrosSaidas ={
    devedor: 'Todos',
    status: 'Todos',
    meiosPagto: 'Todos',
    classificacao: 'Todos'
  }
  listaDevedores:Devedor[] = [];

  constructor(private util:UtilsService, private store:Store, private filtrosService: FiltrosService){
    this.meses$ = util.getMeses;
    this.anos$ = util.getAnos;
    store.select(getLoadMesAno).subscribe(res=> {
      util.loadDateYear(res)
    });
    this.menuSelected$ = store.select(getMenuSelectedConfigs).pipe(takeUntil(this.unsubscribe));
    store.select(getLoadingDevedor).pipe(takeUntil(this.unsubscribe)).subscribe(res => this.loading = res);
    this.devedores$ = store.select(getDevedoresAtivos).pipe(takeUntil(this.unsubscribe));  
    this.status$ = store.select(getListaStatus).pipe(takeUntil(this.unsubscribe));
    this.meioPagto$ = store.select(getListaMeiosPagto).pipe(takeUntil(this.unsubscribe));
    this.tags$ = store.select(getListaClassificacao).pipe(takeUntil(this.unsubscribe));    
    store.select(getDevedoresAtivos).pipe(takeUntil(this.unsubscribe)).subscribe(res=> this.listaDevedores = res);
  }
  
  handleSelectsChanged(){
    this.anoInicial.valueChanges.subscribe(value=>{
      this.atual.anoStart = parseInt(value);
      this.store.dispatch(setMesAnoInicialFinal({payload:this.atual}));
    })
    this.anoFinal.valueChanges.subscribe(value=>{
      this.atual.anoEnd = parseInt(value);
      this.store.dispatch(setMesAnoInicialFinal({payload:this.atual}));
    })
    this.mesInicial.valueChanges.subscribe(value=>{
      this.atual.mesStart = parseInt(value);
      this.store.dispatch(setMesAnoInicialFinal({payload:this.atual}));
    })
    this.mesFinal.valueChanges.subscribe(value=>{
      this.atual.mesEnd = parseInt(value);
      this.store.dispatch(setMesAnoInicialFinal({payload:this.atual}));
    })
    this.devedor.valueChanges.subscribe(value=>{
      const payload = {...this.filtroGeral};
      this.listaDevedores.forEach(e=> {if(e.id == parseInt(value)) {
        payload.devedor = e.nome
        this.filtroGeral.devedor = e.nome
      }})
      this.store.dispatch(updateFiltroListaSaidas({payload}));
    })
    this.status.valueChanges.subscribe(value=>{
      const payload = {...this.filtroGeral};
      this.filtroGeral.status = value;
      payload.status = value
      this.store.dispatch(updateFiltroListaSaidas({payload}));
    })
    this.meioPagto.valueChanges.subscribe(value=>{
      const payload = {...this.filtroGeral};
      this.filtroGeral.meiosPagto = value;
      payload.meiosPagto = value
      this.store.dispatch(updateFiltroListaSaidas({payload}));
    })
    this.tag.valueChanges.subscribe(value=>{
      const payload = {...this.filtroGeral};
      this.filtroGeral.classificacao = value;
      payload.classificacao = value
      this.store.dispatch(updateFiltroListaSaidas({payload}));
    })
  }

  ngOnInit(): void {
    this.store.select(getFirtLoadDevedores).subscribe(res=>{
      if(res){
        this.store.dispatch(loadDevedores());
      }
    })
  }
  
  ngAfterContentInit(): void {
    this.store.select(getMesAno).subscribe(res=>{
      this.atual = {...res};
      if(this.firstLoad){
        this.firstLoad = false;
        this.mesInicial.setValue(`${this.atual.mesStart}`);
        this.mesFinal.setValue(`${this.atual.mesEnd}`);
        this.anoInicial.setValue(`${this.atual.anoStart}`);
        this.anoFinal.setValue(`${this.atual.anoEnd}`);
      }
    });
    this.selecionarPrimeiroItem();
    // this.store.select(getMenuSelectedConfigs).subscribe(res=>{
    //   this.menuSelecionado = res;
    // })
    this.handleSelectsChanged();
  }

  selecionarPrimeiroItem() {
    this.devedores$.pipe(take(1)).subscribe((devedores) => {
      if (devedores.length > 0) {
        this.store.select(getDevedorId).subscribe(idDevedor => this.devedor.setValue(`${[idDevedor]}`));
      }
    });
    this.meioPagto$.pipe(take(1)).subscribe(item=>{
      if(item.length >0){
        this.meioPagto.setValue(`${item[0]}`);
      }
    });
    this.status$.pipe(take(1)).subscribe(item=>{
      if(item.length >0){
        this.status.setValue(`${item[0]}`);
      }
    });
    this.tags$.pipe(take(1)).subscribe(item=>{
      if(item.length >0){
        this.tag.setValue(`${item[0]}`);
      }
    });
  }
  loadFiltrosDefaul(){
    this.menuSelected$.subscribe(res=>{
      switch (res.nome) {
        case 'saida':
          
          break;
        case 'entrada':
          
          break;
      
        default:
          break;
      }
    })
  }

  ngOnDestroy() {
    console.log("Encerrando o componente - Filtros");
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
