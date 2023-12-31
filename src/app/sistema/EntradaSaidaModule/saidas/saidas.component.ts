import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuSelected } from '../../store/sistema.state';
import { setMenuSelected } from '../../store/sistema.actions';
import { getFiltroSaidas, getFirtLoadListaSaidas, getListaMesesAnosCarregados, getListaSaidasByFiltro, } from '../store/entradasSaidas.selectors';
import { getMesAno } from '../../store/sistema..selectors';
import { loadListaSaidas } from '../store/entradasSaidas.actions';
import { MesAno } from 'src/model/config/mes-ano';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ItemListaSaidaApi } from 'src/model/general/item-lista-saida-api';
import { filtrosSaidas } from 'src/model/config/filtrosSaidas';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})
export class SaidasComponent {
  estadoInicial: IMenuSelected = {
    nome: 'saida',
    tabDefault: 1,
    configs: {
      titulo: '',
      menus: []
    }
  }
  constructor(private store: Store) {
    store.dispatch(setMenuSelected({ payload: this.estadoInicial }));
  }
}

