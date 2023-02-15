import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestimentListComponent } from '../components/investment-list/investment-list.component';
import { CustomRedemptionComponent } from '../components/custom-redemption/custom-redemption.component';

const routes: Routes = [
  {
    path: '',
    component: InvestimentListComponent
  },
  {
    path: 'custom-redemption',
    component: CustomRedemptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalCardsRoutingModule { }
