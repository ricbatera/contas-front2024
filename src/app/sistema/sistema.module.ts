import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SistemaRoutingModule } from './sistema-routing.module';
import { StoreModule } from '@ngrx/store';
import { menuSelectedFeatureKey, menuSelectedReducer, mesAnoFeatureKey, mesAnoReducer } from './store/sistema.reducer';
import { TabCompomentsComponent } from './components/tab-compoments/tab-compoments.component';

//Angular material
import {MatTabsModule} from '@angular/material/tabs';
import { EntradaSaidaModule } from './EntradaSaidaModule/entrada-saida.module';
import { CadastrosModule } from './cadastros/cadastros.module';


@NgModule({
  declarations: [
    SistemaComponent,
    TabCompomentsComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MatSidenavModule,
    // EntradaSaidaModule,
    // CadastrosModule,
    MatButtonModule,
    MatTabsModule,
    StoreModule.forFeature(mesAnoFeatureKey, mesAnoReducer),
    StoreModule.forFeature(menuSelectedFeatureKey, menuSelectedReducer),
  ],
  exports:[
    TabCompomentsComponent
  ]
})
export class SistemaModule { }
