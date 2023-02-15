import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvestimentList } from '../../model/response/investment-response';
import { InvestimentService } from '../../service/investiment.service';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss']
})
export class InvestimentListComponent implements OnInit, OnDestroy {

  public subscriptions: Array<Subscription> = [];
  public investiment: InvestimentList[];

  constructor(
    private investimentService: InvestimentService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.investiments();
  }

  public investiments() {
    this.subscriptions.push(this.investimentService.getInvestimentApi().subscribe(
      resp => {
        if (resp) {
          this.investiment = resp.response.data.listaInvestimentos;
        }
      })
    )
  }

  public displayRedemption(element: InvestimentList) {
    if (element.indicadorCarencia === 'N') {
      this.investimentService.setAccumulatedBalance(element);
      this.router.navigate(['/custom-redemption']);
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
