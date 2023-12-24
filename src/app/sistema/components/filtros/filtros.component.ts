import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
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

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit{
  loading = true;
  meses$: Observable<meses[]>;
  anos$: Observable<number[]>;
  devedores$: Observable<Devedor[]>;
  mesInicial = new FormControl();
  mesFinal = new FormControl();
  anoInicial = new FormControl();
  anoFinal = new FormControl();
  devedor = new FormControl();
  getLoadMesAno: boolean = false;
  menuSelected$: Observable<IMenuSelected>;
  atual: MesAno = {
    mesStart: 0,
    anoStart: 0,
    mesEnd: 0,
    anoEnd: 0
  }
  firstLoad = true;

  constructor(private util:UtilsService, private store:Store, private filtrosService: FiltrosService){
    this.meses$ = util.getMeses;
    this.anos$ = util.getAnos;
    store.select(getLoadMesAno).subscribe(res=> {
      util.loadDateYear(res)
    });
    this.menuSelected$ = store.select(getMenuSelectedConfigs);
    store.select(getLoadingDevedor).subscribe(res => this.loading = res);
    this.devedores$ = store.select(getDevedoresAtivos);    
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
    this.handleSelectsChanged();
  }

  selecionarPrimeiroItem() {
    this.devedores$.pipe(take(1)).subscribe((devedores) => {
      if (devedores.length > 0) {
        this.store.select(getDevedorId).subscribe(idDevedor => this.devedor.setValue(`${[idDevedor]}`));
      }
    });
  }
}
