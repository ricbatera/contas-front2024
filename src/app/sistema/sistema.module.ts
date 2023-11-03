import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SistemaRoutingModule } from './sistema-routing.module';
import { StoreModule } from '@ngrx/store';
import { mesAnoFeatureKey, mesAnoReducer } from './store/sistema.reducer';


@NgModule({
  declarations: [
    SistemaComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    StoreModule.forFeature(mesAnoFeatureKey, mesAnoReducer)
  ]
})
export class SistemaModule { }
