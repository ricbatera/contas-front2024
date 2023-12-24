import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaModule } from '../sistema.module';
import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { ESEffects } from './store/entradasSaidas.effects';
import { listaSaidaKey, listaSaidaReducer } from './store/entradasSaidas.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SistemaModule,
    // StoreModule.forFeature(listaSaidaKey, listaSaidaReducer),    
    // EffectsModule.forFeature([ESEffects])
  ]
})
export class EntradaSaidaModule { }
