import { Component } from '@angular/core';
import { IMenuSelected } from '../store/sistema.state';
import { setMenuSelected } from '../store/sistema.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent {
  estadoInicial: IMenuSelected ={
    nome: 'cadastros',
    tabDefault: 0,
    configs: {
      titulo: '',
      menus: []
    }
  }

  constructor(private store:Store){
    store.dispatch(setMenuSelected({payload: this.estadoInicial}))
  }
}
