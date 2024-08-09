import { Component, inject } from '@angular/core';
import { InvestmentService } from '../shared/services/investment.service';
import { InvestmentResult } from '../shared/models/investment-result.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  getInvestmentResults() {
    return this.investmentService.getInvestmentResults();
  }
}
