import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { InvestimentList } from '../model/response/investment-response';
import { GlobalCardsRoutingModule } from '../module/global-cards-routing.module';
import { InvestimentService } from './investiment.service';

describe('InvestimentService', () => {
  let service: InvestimentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        GlobalCardsRoutingModule,
        HttpClientModule,
      ],
      providers: [
        InvestimentService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.get(InvestimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getInvestimentApi', () => {
    const resp = InvestimentList;
    spyOn(service['httpClient'], 'get').and.returnValue(of(resp));
    service.getInvestimentApi().subscribe(response => {
      expect(response).toBeDefined();
    });
  });

  it('should call getInvestimentList', () => {
    const mock = new InvestimentList;
    service.setAccumulatedBalance(mock);
    expect(service.getInvestimentList()).toEqual(mock);
  });

  it('should call getForms', () => {
    const mock = new FormGroup([]);
    service.setForms(mock);
    expect(service.getForms()).toEqual(mock);
  });


});