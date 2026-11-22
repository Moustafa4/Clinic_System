import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Data } from '../../../core/Services/data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Core } from '../../../core/Services/core';
import { AuthService, LoginResponse } from '../../../core/Services/auth-service';

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
  private Auth = inject(AuthService);
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
      Password: ['', [Validators.required]],
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

    const role = this.selectedRole();

    if (!role) {
      console.error('No role selected');
      return;
    }

    const payload = {
      ...this.Form.getRawValue(),
      Role: role,
    };

    this.Data.post<LoginResponse>('Auth/Login', payload).subscribe({
      next: (res) => {
        // 1. Save Token And Role
        this.Auth.saveAuthData(res);

        // 2. Show Success Message
        this.Core._Sussess.next('تم تسجيل الدخول بنجاح، مرحبا بعودتك');

        // 3. Navigate To Dashboard
        this.router.navigate(['/admin-dashboard']);
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
