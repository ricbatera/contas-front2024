import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SistemaRoutingModule } from './sistema-routing.module';
import { StoreModule } from '@ngrx/store';
import { menuSelectedFeatureKey, menuSelectedReducer, mesAnoFeatureKey, mesAnoReducer } from './store/sistema.reducer';
import { TabCompomentsComponent } from './components/tab-compoments/tab-compoments.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular material
import {MatTabsModule} from '@angular/material/tabs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntradaSaidaModule } from './EntradaSaidaModule/entrada-saida.module';
import { CadastrosModule } from './cadastros/cadastros.module';
import { FiltrosComponent } from './components/filtros/filtros.component';


@NgModule({
  declarations: [
    SistemaComponent,
    TabCompomentsComponent,
    FiltrosComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MatSidenavModule,
    // EntradaSaidaModule,
    // CadastrosModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    StoreModule.forFeature(mesAnoFeatureKey, mesAnoReducer),
    StoreModule.forFeature(menuSelectedFeatureKey, menuSelectedReducer),
  ],
  exports:[
    TabCompomentsComponent
  ]
})
export class SistemaModule { }
