import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalCardsModule } from './global-cards/module/global-cards.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalCardsModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
