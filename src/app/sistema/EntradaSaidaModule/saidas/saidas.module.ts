import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidasComponent } from './saidas.component';
import { SistemaModule } from '../../sistema.module';



@NgModule({
  declarations: [
    SaidasComponent,
  ],
  imports: [
    CommonModule,
    SistemaModule
  ]
})
export class SaidasModule { }
