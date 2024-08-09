import { Injectable } from '@angular/core';
import { InvestmentResult } from '../models/investment-result.model';
import { UserInputForm } from '../models/user-input-form.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investmentResults: InvestmentResult[] = [];
  constructor() {}

  private calculateInvestmentResults(userInputForm: UserInputForm) {
    this.clearOldData();
    let investmentValue = userInputForm.initialInvestment;
    for (let i = 0; i < userInputForm.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (userInputForm.expectedReturn / 100);
      investmentValue += interestEarnedInYear + userInputForm.annualInvestment;
      const totalInterest =
        investmentValue -
        userInputForm.annualInvestment * year -
        userInputForm.initialInvestment;
      this.investmentResults.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: userInputForm.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          userInputForm.initialInvestment +
          userInputForm.annualInvestment * year,
      });
    }
  }

  clearOldData() {
    this.investmentResults = [];
  }

  getInvestmentResults(): InvestmentResult[] {
    return this.investmentResults;
  }
  addInvestmentResult(userInputForm: UserInputForm) {
    this.calculateInvestmentResults(userInputForm);
  }
}
