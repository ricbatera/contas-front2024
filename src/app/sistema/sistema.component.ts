import { Component } from '@angular/core';
import { style, trigger, animate, transition, keyframes } from '@angular/animations';
import { ConfigService } from '../services/config.service';
import { FiltrosService } from '../services/filtros.service';
import { Store } from '@ngrx/store';
import { getLoadMesAno } from './store/sistema..selectors';
import { setMesAnoInicialFinal } from './store/sistema.actions';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  animations:[
    trigger('rotate',[
      transition(':enter',[        
        animate('1000ms', keyframes([
          style({transform: 'rotate(0deg)', offset:'0'}),
          style({transform: 'rotate(2turn)', offset:'1'})
        ]))
      ])
    ])
  ]
})
export class SistemaComponent {
  menu$ = this.configs.getMenuLateral
  menuCollapsed = false;

  toogleNav(): void{
    this.menuCollapsed = !this.menuCollapsed;
  }
  closeNav(): void{
    this.menuCollapsed = false;
  }

  constructor(
    private configs: ConfigService,
    private filtrosService: FiltrosService,
    private store: Store
  ){
    // nesse construtor defino os parametros globais iniciais da aplicação, fazendo verificação se já não foram carregados no state
    if(store.select(getLoadMesAno)){
      console.log("Carregando dados da aplicação");
      // seta mes e ano inicial e final se ainda não foi setado
      const payload = filtrosService.defineMesAnoInicial();
      store.dispatch(setMesAnoInicialFinal({payload}));
    }
  }

}
