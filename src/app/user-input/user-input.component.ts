import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { type UserInputForm } from '../shared/models/user-input-form.model';
import { InvestmentService } from '../shared/services/investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent implements OnInit {
  investmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private investmentService: InvestmentService
  ) {}

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      annualInvestment: [0, [Validators.required, Validators.min(1)]],
      duration: [10, [Validators.required, Validators.min(1)]],
      expectedReturn: [5, [Validators.required, Validators.min(1)]],
      initialInvestment: [0, [Validators.required, Validators.min(1)]],
    });
  }

  addInvestment() {
    if (this.investmentForm.valid) {
      console.log(this.investmentForm.valid);
      var input: UserInputForm = this.investmentForm.getRawValue();
      this.investmentService.addInvestmentResult(input);
      this.investmentForm.reset({
        annualInvestment: [0],
        duration: [10],
        expectedReturn: [5],
        initialInvestment: [0],
      });
    }
  }
}
