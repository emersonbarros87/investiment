import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GlobalCardsRoutingModule } from '../module/global-cards-routing.module';
import { InvestimentService } from '../service/investiment.service';
import { DialogErrorComponent } from './dialog-error.component';

describe('DialogErrorComponent', () => {
  let component: DialogErrorComponent;
  let fixture: ComponentFixture<DialogErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogErrorComponent],
      imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        GlobalCardsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
      ],
      providers: [
        InvestimentService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open dialog', () => {
    spyOn(component['router'], 'navigate');
    let form = component['investService'].getForms();
    spyOn(component['investService'], 'getInvestimentApi').and.returnValue(of(form));
    component.dialogError();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/custom-redemption']);
  });

});


