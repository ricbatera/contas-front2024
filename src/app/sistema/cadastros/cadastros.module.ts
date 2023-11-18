import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros.component';
import { SistemaModule } from '../sistema.module';
import { StoreModule } from '@ngrx/store';
import { devedorFeatureKey, devedorReducer } from './store/cadastro.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CadastrosEffects } from './store/cadastro.effects';


@NgModule({
  declarations: [
    CadastrosComponent,
  ],
  imports: [
    CommonModule,
    SistemaModule,
    StoreModule.forFeature(devedorFeatureKey, devedorReducer),    
    EffectsModule.forFeature([CadastrosEffects])
  ]
})
export class CadastrosModule { }
