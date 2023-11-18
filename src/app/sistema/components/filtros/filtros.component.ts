import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { meses } from 'src/model/general/meses';
import { getLoadMesAno, getMenuSelectedConfigs, getMesAno } from '../../store/sistema..selectors';
import { MesAno } from 'src/model/config/mes-ano';
import { IMenuSelected } from '../../store/sistema.state';
import { getDevedoresAtivos, getFirtLoadDevedores, getLoadingDevedor } from '../../cadastros/store/cadastro.selectors';
import { loadDevedores } from '../../cadastros/store/cadastro.actions';
import { Devedor } from 'src/model/general/devedor';

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

  constructor(private util:UtilsService, private store:Store){
    this.meses$ = util.getMeses;
    this.anos$ = util.getAnos;
    store.select(getLoadMesAno).subscribe(res=> {
      util.loadDateYear(res)
    });
    this.menuSelected$ = store.select(getMenuSelectedConfigs);
    store.select(getLoadingDevedor).subscribe(res => this.loading = res);
    this.devedores$ = store.select(getDevedoresAtivos);
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
      const result: MesAno = {...res}
      this.mesInicial.setValue(`${result.mesStart}`);
      this.mesFinal.setValue(`${result.mesEnd}`);
      this.anoInicial.setValue(`${result.anoStart}`);
      this.anoFinal.setValue(`${result.anoEnd}`);
    });
    this.selecionarPrimeiroItem()
  }

  selecionarPrimeiroItem() {
    this.devedores$.pipe(take(1)).subscribe((devedores) => {
      if (devedores.length > 0) {
        this.devedor.setValue(`${devedores[0].id}`);
      }
    });
  }
}
