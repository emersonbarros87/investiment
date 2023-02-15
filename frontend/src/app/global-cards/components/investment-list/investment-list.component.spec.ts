import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { GlobalCardsRoutingModule } from '../../module/global-cards-routing.module';
import { InvestimentService } from '../../service/investiment.service';
import { InvestimentListComponent } from './investment-list.component';

describe('InvestimentListComponent', () => {
  let component: InvestimentListComponent;
  let fixture: ComponentFixture<InvestimentListComponent>;

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
              },
              {
                "id": "2",
                "nome": "Vale (VALE3)",
                "percentual": 20.71
              },
              {
                "id": "3",
                "nome": "Petrobras (PETR4)",
                "percentual": 21.63
              },
              {
                "id": "4",
                "nome": "Cemig (CMIG3)",
                "percentual": 12.41
              },
              {
                "id": "5",
                "nome": "Oi (OIBR3)",
                "percentual": 17.15
              }
            ]
          },
          {
            "nome": "INVESTIMENTO II",
            "objetivo": "Viajem dos sonhos",
            "saldoTotal": 7300,
            "indicadorCarencia": "N",
            "acoes": [
              {
                "id": "1",
                "nome": "Banco do Brasil (BBAS3)",
                "percentual": 35.81
              },
              {
                "id": "2",
                "nome": "Vale (VALE3)",
                "percentual": 26.42
              },
              {
                "id": "3",
                "nome": "Petrobras (PETR4)",
                "percentual": 37.77
              }
            ]
          },
          {
            "nome": "INVESTIMENTO III",
            "objetivo": "Abrir meu próprio negócio",
            "saldoTotal": 26000,
            "indicadorCarencia": "N",
            "acoes": [
              {
                "id": "1",
                "nome": "Banco do Brasil (BBAS3)",
                "percentual": 41.1
              },
              {
                "id": "2",
                "nome": "Vale (VALE3)",
                "percentual": 22.43
              },
              {
                "id": "3",
                "nome": "Petrobras (PETR4)",
                "percentual": 26.12
              },
              {
                "id": "5",
                "nome": "OI (OIBR3)",
                "percentual": 10.35
              }
            ]
          },
          {
            "nome": "INVESTIMENTO IV",
            "objetivo": "Investimento em carencia",
            "saldoTotal": 44000,
            "indicadorCarencia": "S",
            "acoes": [
              {
                "id": "1",
                "nome": "Banco do Brasil (BBAS3)",
                "percentual": 41.1
              },
              {
                "id": "2",
                "nome": "Vale (VALE3)",
                "percentual": 22.43
              },
              {
                "id": "3",
                "nome": "Petrobras (PETR4)",
                "percentual": 26.12
              },
              {
                "id": "5",
                "nome": "OI (OIBR3)",
                "percentual": 10.35
              }
            ]
          }
        ]
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestimentListComponent],
      imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        GlobalCardsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        InvestimentService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('investiments sucess', () => {
    spyOn(component['investimentService'], 'getInvestimentApi').and.returnValue(of(mock));
    component.investiments();
    expect(component.investiment).toEqual(mock.response.data.listaInvestimentos);
  });

  it('indicadorCarencia === "N" and OPEN next screen', () => {
    spyOn(component['router'], 'navigate');
    spyOn(component['investimentService'], 'getInvestimentApi').and.returnValue(of(mock));
    component.displayRedemption(mock.response.data.listaInvestimentos[1]);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/custom-redemption']);
  });

  it('indicadorCarencia === "S" and NOT open next screen', () => {
    spyOn(component['router'], 'navigate');
    spyOn(component['investimentService'], 'getInvestimentApi').and.returnValue(of(mock));
    component.displayRedemption(mock.response.data.listaInvestimentos[3]);
    expect(component['router'].navigate).not.toHaveBeenCalledWith(['/custom-redemption']);
  });

});
