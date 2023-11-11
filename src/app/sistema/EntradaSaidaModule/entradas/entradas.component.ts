import { Component } from '@angular/core';
import { IMenuSelected } from '../../store/sistema.state';
import { Store } from '@ngrx/store';
import { setMenuSelected } from '../../store/sistema.actions';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent {
  estadoInicial: IMenuSelected ={
    nome: 'entrada',
    tabDefault: 1,
    configs: {
      titulo: '',
      menus: []
    }
  }

  constructor(private store:Store){
    store.dispatch(setMenuSelected({payload: this.estadoInicial}))
  }

}
