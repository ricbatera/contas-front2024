import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradasComponent } from './entradas.component';
import { SistemaModule } from '../../sistema.module';



@NgModule({
  declarations: [
    EntradasComponent,
  ],
  imports: [
    CommonModule,
    SistemaModule
  ]
})
export class EntradasModule { }
