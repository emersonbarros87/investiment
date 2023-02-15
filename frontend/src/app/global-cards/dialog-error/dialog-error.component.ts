import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvestimentService } from '../service/investiment.service';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent {

  public formGroup: FormGroup = new FormGroup({
    investValue: new FormArray([])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: string,
    private investService: InvestimentService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.investService.getForms();
  }

  public dialogError() {
    if (this.formGroup.valid) {
      this.router.navigate(['/custom-redemption']);
    }
  }

  public getFormInvestiment() {
    return this.formGroup.get('investValue') as FormArray;
  }

  public getFormControl(item: AbstractControl | FormGroup) {
    return item as FormGroup;
  }
}
