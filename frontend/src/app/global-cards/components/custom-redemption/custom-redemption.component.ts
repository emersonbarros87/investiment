import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogErrorComponent } from '../../dialog-error/dialog-error.component';
import { DialogSucessComponent } from '../../dialog-sucess/dialog-sucess.component';
import { Mask } from '../../model/mask/mask';
import { Actions, InvestimentList } from '../../model/response/investment-response';
import { InvestimentService } from '../../service/investiment.service';



@Component({
  selector: 'app-custom-redemption',
  templateUrl: './custom-redemption.component.html',
  styleUrls: ['./custom-redemption.component.scss']
})
export class CustomRedemptionComponent {

  public form: FormGroup = new FormGroup({ investValue: new FormArray([]) });
  public areaMask = Mask.getArea();
  public subscriptions: Array<Subscription> = [];
  public actions: Actions[];
  public investiment: InvestimentList[];
  public redemptions: InvestimentList;
  public totalRedemptions: number = 0;
  public isValidForm: boolean;

  constructor(
    private investimentService: InvestimentService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getAction();
    this.redemptions = this.investimentService.getInvestimentList();
  }

  public redemptionForms(data: Actions[]) {
    let getInvest = this.getFormInvestiment();
    data.forEach(element => {
      let formControl = new FormGroup({
        value: new FormControl(null, this.validatorValue(element.saldoAcumulado)),
        accumulatedBalance: new FormControl(element.saldoAcumulado),
        name: new FormControl(element.nome),
      });
      getInvest.push(formControl);
    });
  }

  public validatorValue(value: number | undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && value && (control.value > value) ? { maxValue: true } : null;
    };
  }

  public getFormInvestiment() {
    return this.form.get('investValue') as FormArray;
  }

  public getFormControl(item: AbstractControl | FormGroup) {
    return item as FormGroup;
  }

  public getAction() {
    this.subscriptions.push(this.investimentService.getInvestimentApi().subscribe(
      resp => {
        if (resp) {
          this.investiment = resp.response.data.listaInvestimentos
          this.accumulatedBalance(this.investiment);
        }
      })
    )
  }

  public accumulatedBalance(data: InvestimentList[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].nome === this.investimentService.getInvestimentList().nome) {
        this.actions = data[i].acoes;
        this.actions.forEach(element => {
          if (element.percentual) {
            element.saldoAcumulado = (data[i].saldoTotal * element.percentual) / 100;
          }
        });
        this.redemptionForms(this.actions);
      }
    }
  }

  public redemption() {
    this.investimentService.setForms(this.form);
    this.isValidForm = this.form.valid

    if (this.isValidForm) {
      this.dialog.open(DialogSucessComponent);
    }
    if (!this.isValidForm) {
      this.dialog.open(DialogErrorComponent);
    }
  }

  public totalRedemption() {
    this.totalRedemptions = this.getFormInvestiment().controls
      .map(element => element.get('value')?.value)
      .reduce((total, current) => current ? total + current : total, 0)
  }

  public cancel() {
    this.router.navigate(['/investment-list']);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
