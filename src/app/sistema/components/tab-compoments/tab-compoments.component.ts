import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getMenuSelectedConfigs } from '../../store/sistema..selectors';
import { Observable, map } from 'rxjs';
import { IMenuSelected } from '../../store/sistema.state';
import { setTabMenu } from '../../store/sistema.actions';

@Component({
  selector: 'app-tab-compoments',
  templateUrl: './tab-compoments.component.html',
  styleUrls: ['./tab-compoments.component.css']
})
export class TabCompomentsComponent {

  configs$:Observable<IMenuSelected>;
  tab$ = this.store.select(getMenuSelectedConfigs).pipe(map(res => res.tabDefault));


  constructor(
    private store:Store
  ){
    this.configs$ = this.store.select(getMenuSelectedConfigs);
  }

  setaTab(ev: number){
    this.store.dispatch(setTabMenu({payload: ev}));
  }

}
