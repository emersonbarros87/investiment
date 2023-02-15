import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { InvestimentListComponent } from './global-cards/components/investment-list/investment-list.component';
import { GlobalCardsRoutingModule } from './global-cards/module/global-cards-routing.module';
import { InvestimentService } from './global-cards/service/investiment.service';

describe('InvestimentListComponent', () => {
  let component: InvestimentListComponent;
  let fixture: ComponentFixture<InvestimentListComponent>;

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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
});
