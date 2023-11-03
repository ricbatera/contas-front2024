import { Injectable } from '@angular/core';
import { MenuLateral } from 'src/model/config/menu-lateral';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //menu lateral
  public getMenuLateral = of(this.menuLateral())
  private menuLateral():MenuLateral[]{
    return [
      {
          routelink:"dashboard",
          icone:'fal fa-tachometer-fast',
          legenda: 'Dashboard'
      },
      {
          routelink:"saidas",
          icone:'fal fa-shopping-basket',
          legenda: 'Saídas'
      },
      {
          routelink:"entradas",
          icone:'fal fa-comment-dollar',
          legenda: 'Entradas'
      },
      {
          routelink:"cadastros",
          icone:'fal fa-layer-plus',
          legenda: 'Cadastros'
      }
  ]
  }  

  constructor() { }
}
