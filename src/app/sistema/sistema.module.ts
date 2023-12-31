import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SistemaRoutingModule } from './sistema-routing.module';
import { StoreModule } from '@ngrx/store';
import { filtrosFeatureKey, filtrosReducer, menuSelectedFeatureKey, menuSelectedReducer,  } from './store/sistema.reducer';
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

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { ESEffects } from './EntradaSaidaModule/store/entradasSaidas.effects';
import { listaEntradaKey, listaEntradaReducer, listaSaidaKey, listaSaidaReducer } from './EntradaSaidaModule/store/entradasSaidas.reducer';
import { ListaSaidasComponent } from './EntradaSaidaModule/saidas/lista-saidas/lista-saidas.component';


@NgModule({
  declarations: [
    SistemaComponent,
    TabCompomentsComponent,
    FiltrosComponent,
    ListaSaidasComponent
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
    MatProgressSpinnerModule,
    StoreModule.forFeature(filtrosFeatureKey, filtrosReducer),
    StoreModule.forFeature(menuSelectedFeatureKey, menuSelectedReducer),
    StoreModule.forFeature(listaSaidaKey, listaSaidaReducer),    
    StoreModule.forFeature(listaEntradaKey, listaEntradaReducer),    
    EffectsModule.forFeature([ESEffects])
  ],
  exports:[
    TabCompomentsComponent
  ]
})
export class SistemaModule { }
