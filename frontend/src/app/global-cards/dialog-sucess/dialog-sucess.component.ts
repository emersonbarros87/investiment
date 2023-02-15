import { Component, Inject } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvestimentService } from '../service/investiment.service';

@Component({
  selector: 'app-dialog-sucess',
  templateUrl: './dialog-sucess.component.html',
  styleUrls: ['./dialog-sucess.component.scss']
})
export class DialogSucessComponent {
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

  public dialogSucess() {
    if (this.formGroup.valid) {
      this.router.navigate(['/investment-list']);
    }
  }

  public getFormControl(item: AbstractControl | FormGroup) {
    return item as FormGroup;
  }
}
