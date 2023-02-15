import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environment/environment';
import { InvestimentList } from '../model/response/investment-response';
import { FormArray, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class InvestimentService {

  public investimentList: InvestimentList;
  public formGroup: FormGroup = new FormGroup({
    investValue: new FormArray([])
  });

  constructor(private httpClient: HttpClient) { }

  public getInvestimentApi(): Observable<any> {
    return this.httpClient.get<any>(`${API}`)
  }

  public getInvestimentList() {
    return this.investimentList;
  }

  public setAccumulatedBalance(name: InvestimentList) {
    this.investimentList = name;
  }

  public getForms() {
    return this.formGroup;
  }

  public setForms(name: FormGroup) {
    this.formGroup = name;
  }

}
