import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { meses } from 'src/model/general/meses';
import { getLoadMesAno, getMenuSelectedConfigs, getMesAno } from '../../store/sistema..selectors';
import { MesAno } from 'src/model/config/mes-ano';
import { IMenuSelected } from '../../store/sistema.state';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent{
  meses$: Observable<meses[]>;
  anos$: Observable<number[]>;
  mesInicial = new FormControl();
  mesFinal = new FormControl();
  anoInicial = new FormControl();
  anoFinal = new FormControl();
  getLoadMesAno: boolean = false;
  menuSelected$: Observable<IMenuSelected>;

  constructor(private util:UtilsService, private store:Store){
    this.meses$ = util.getMeses;
    this.anos$ = util.getAnos;
    store.select(getLoadMesAno).subscribe(res=> {
      util.loadDateYear(res)
    });
    this.menuSelected$ = store.select(getMenuSelectedConfigs);
  }
  ngAfterViewInit(): void {
    this.store.select(getMesAno).subscribe(res=>{
      const result: MesAno = {...res}
      this.mesInicial.setValue(`${result.mesStart}`);
      this.mesFinal.setValue(`${result.mesEnd}`);
      this.anoInicial.setValue(`${result.anoStart}`);
      this.anoFinal.setValue(`${result.anoEnd}`);
    })
  }

  meesInicialHandler(e: any){
    console.log(e);
  }

}
