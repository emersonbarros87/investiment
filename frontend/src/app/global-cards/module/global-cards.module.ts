import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomRedemptionComponent } from '../components/custom-redemption/custom-redemption.component';
import { InvestimentListComponent } from '../components/investment-list/investment-list.component';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogSucessComponent } from '../dialog-sucess/dialog-sucess.component';
import { GlobalCardsRoutingModule } from './global-cards-routing.module';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    InvestimentListComponent,
    CustomRedemptionComponent,
    DialogSucessComponent,
    DialogErrorComponent
  ],
  imports: [
    CommonModule,
    GlobalCardsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatDialogModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class GlobalCardsModule { }
