import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'investment-list'
  },
  {
    path: 'investment-list',
    loadChildren: () => import('../app/global-cards/module/global-cards.module').then(m => m.GlobalCardsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
