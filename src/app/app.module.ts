import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// STORE (NgRx)
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// LOCALE & IDIOMA
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

//MÓDULOS DO SISTEMA
import { SistemaModule } from './sistema/sistema.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SistemaModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    {provide: LOCALE_ID, useValue:'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
