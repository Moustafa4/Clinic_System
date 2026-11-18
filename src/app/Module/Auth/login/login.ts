import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Data } from '../../../core/Services/data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Core } from '../../../core/Services/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  Form!: FormGroup;

  showPassword = false;
  rememberMe = false;
  selectedRole = signal<string | null>(null);
  private FB = inject(FormBuilder);
  private Data = inject(Data);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private Core = inject(Core);

  ngOnInit(): void {
    this.InitForm();
    this.route.queryParamMap.subscribe((params) => {
      const role = params.get('role');
      this.selectedRole.set(role);
      console.log(this.selectedRole());
    });
  }

  InitForm(): void {
    this.Form = this.FB.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: [''],
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
      Role: this.selectedRole(),
    };
    console.log('Sending payload:', payload);

    this.Data.post<any>('Auth/Login', payload).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        this.Core._Sussess.next('تم تسجيل الدخول بنجاح،مرحبا بعودتك');
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
  private Register(): void {
    const role = this.selectedRole();

    if (!role) return;

    this.router.navigate(['/register'], {
      queryParams: {
        role: role,
      },
    });
  }
}
