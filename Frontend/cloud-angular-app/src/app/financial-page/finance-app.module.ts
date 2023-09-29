import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Financial page imports
import { EstimateComponent } from './estimate/estimate.component';
import { ServiceTableComponent } from './service-table/service-table.component';
import { CostEstimationComponent } from './cost-estimation-title/cost-estimation-title.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FinanceComponent } from './finance-app';
import { estimateUSDPipe } from './pipes/estimateUSD.pipe';
import { PageButtonsComponent } from './page-buttons/page-buttons.component';
import { financeRoutingModule } from './financial-page-router.module';

@NgModule({
    declarations: [
      EstimateComponent,
      ServiceTableComponent,
      CostEstimationComponent,
      FilterPipe,
      estimateUSDPipe,
      FinanceComponent,
      PageButtonsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      financeRoutingModule
    ],
    exports: [
      EstimateComponent,
      ServiceTableComponent,
      CostEstimationComponent,
      estimateUSDPipe,
      FilterPipe,
      FinanceComponent
    ],
    providers: [],
    bootstrap: []
  })
  export class FinanceAppModule { }