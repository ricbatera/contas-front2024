import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// STORE (NgRx)
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// LOCALE & IDIOMA
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

//MÓDULOS DO SISTEMA
import { SistemaModule } from './sistema/sistema.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CadastrosModule } from './sistema/cadastros/cadastros.module';
import { CadastrosEffects } from './sistema/cadastros/store/cadastro.effects';
import { EntradaSaidaModule } from './sistema/EntradaSaidaModule/entrada-saida.module';
import { SaidasModule } from './sistema/EntradaSaidaModule/saidas/saidas.module';
import { EntradasModule } from './sistema/EntradaSaidaModule/entradas/entradas.module';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SistemaModule,
    CadastrosModule,
    // SaidasModule,
    // EntradasModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue:'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
