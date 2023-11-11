import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosComponent } from './cadastros.component';
import { SistemaModule } from '../sistema.module';



@NgModule({
  declarations: [
    CadastrosComponent,
  ],
  imports: [
    CommonModule,
    SistemaModule
  ]
})
export class CadastrosModule { }
