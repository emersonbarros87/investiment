import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Actions } from '../model/response/investment-response';
import { GlobalCardsRoutingModule } from '../module/global-cards-routing.module';
import { InvestimentService } from '../service/investiment.service';
import { DialogSucessComponent } from './dialog-sucess.component';
describe('DialogSucessComponent', () => {
  let component: DialogSucessComponent;
  let fixture: ComponentFixture<DialogSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSucessComponent],
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
    fixture = TestBed.createComponent(DialogSucessComponent);
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
    component.dialogSucess();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/investment-list']);
  });

});

