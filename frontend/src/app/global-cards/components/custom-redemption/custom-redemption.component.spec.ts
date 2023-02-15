import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DialogSucessComponent } from '../../dialog-sucess/dialog-sucess.component';
import { Actions, InvestimentList } from '../../model/response/investment-response';
import { GlobalCardsRoutingModule } from '../../module/global-cards-routing.module';
import { InvestimentService } from '../../service/investiment.service';
import { CustomRedemptionComponent } from './custom-redemption.component';

describe('CustomRedemptionComponent', () => {
  let component: CustomRedemptionComponent;
  let fixture: ComponentFixture<CustomRedemptionComponent>;

  let mock = {
    "response": {
      "status": "200",
      "data": {
        "listaInvestimentos": [
          {
            "nome": "INVESTIMENTO I",
            "objetivo": "Minha aposentadoria",
            "saldoTotal": 39321.29,
            "indicadorCarencia": "N",
            "acoes": [
              {
                "id": "1",
                "nome": "Banco do Brasil (BBAS3)",
                "percentual": 28.1
              }
            ]
          },
        ]
      },
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomRedemptionComponent],
      imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        GlobalCardsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        InvestimentService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAction sucess', () => {
    let action = new Actions;
    let invest = new InvestimentList;
    invest.nome = 'INVESTIMENTO I';
    invest.objetivo = 'Minha aposentadoria';
    invest.saldoTotal = 39321.29;
    invest.indicadorCarencia = "N";
    invest.acoes = [action];
    action.nome = "Banco do Brasil (BBAS3)";
    action.percentual = 28.1;
    component['investimentService'].setAccumulatedBalance(invest);
    spyOn(component['investimentService'], 'getInvestimentApi').and.returnValue(of(mock));
    component.accumulatedBalance([invest]);
    component.getAction();
    expect(component.investiment).toEqual(mock.response.data.listaInvestimentos);
  });

  it('totalRedemption', () => {
    let action = new Actions;
    let invest = new InvestimentList;
    invest.nome = 'INVESTIMENTO I';
    invest.objetivo = 'test';
    invest.saldoTotal = 100;
    invest.acoes = [action];
    action.nome = 'test';
    action.percentual = 10;
    action.saldoAcumulado = 100;
    component.totalRedemption();
    component.getFormInvestiment().controls.forEach(element => {
      expect(component.totalRedemptions).toEqual(element.value)
    });
  });

  it('redemption()', () => {
    component.redemption();
    expect(component.dialog.open(DialogSucessComponent)).toBeDefined();
  });

  it('redemptionForms', () => {
    let action = new Actions;
    action.nome = 'test';
    action.saldoAcumulado = 100;
    component.redemptionForms([action]);
    component.getFormInvestiment().controls.forEach(element => {
      expect(element.get('name')?.value).toEqual('test');
    });
  });

  it('accumulatedBalance', () => {
    let action = new Actions;
    let invest = new InvestimentList;
    invest.nome = 'test';
    invest.objetivo = 'test';
    invest.saldoTotal = 100;
    invest.acoes = [action];
    action.nome = 'test';
    action.percentual = 10;
    action.saldoAcumulado = 100;
    component['investimentService'].setAccumulatedBalance(invest);
    component.accumulatedBalance([invest]);
    component.getFormInvestiment().controls.forEach(element => {
      expect(element.get('name')?.value).toEqual('test');
    });
  });

  it('cancel', () => {
    spyOn(component['router'], 'navigate');
    component.cancel();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/investment-list']);
  });
});
