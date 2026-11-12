import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Data } from '../../../core/Services/data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  Form!: FormGroup;

  showPassword = false;
  rememberMe = false;

  constructor(
    private FB: FormBuilder,
    private Data: Data,
  ) {}

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm(): void {
    this.Form = this.FB.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: [''],
      RememberMe: [false],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  submit(): void {
    if (this.Form.invalid) {
      this.Form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.Form.getRawValue(),
      Role: 'Admin',
    };
    console.log('Sending payload:', payload);

    this.Data.post<any>('Auth/Login', payload).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
      },
      error: (err) => {
        console.error('Login Error:', err);
        console.log('Status:', err.status);
        console.log('Response:', err.error);
      },
    });
  }

  getControllName(ControlName: string) {
    return this.Form.get(ControlName);
  }
}
