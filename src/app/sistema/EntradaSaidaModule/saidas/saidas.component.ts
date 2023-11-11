import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuSelected } from '../../store/sistema.state';
import { setMenuSelected } from '../../store/sistema.actions';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})
export class SaidasComponent {
  
  estadoInicial: IMenuSelected ={
    nome: 'saida',
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