import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Data } from '../../../core/Services/data';
import { ErrorHandlerService } from '../../../shared/services/ErrorHandlerService/error-handler-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private Data = inject(Data);
  private ErrorHandlerService = inject(ErrorHandlerService);
  Form!: FormGroup;

  selectedRole = signal<string | null>(null);

  ngOnInit(): void {
    this.initForm();
    this.getSelectedRole();
  }

  // Get selected role from previous page
  getSelectedRole(): void {
    const role =
      this.router.getCurrentNavigation()?.extras.state?.['role'] ??
      history.state?.role ??
      this.route.snapshot.queryParamMap.get('role');

    this.selectedRole.set(role);
    console.log(this.selectedRole());
  }

  // Initialize Register Form
  initForm(): void {
    this.Form = this.fb.group(
      {
        Name: ['', Validators.required],

        PhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],

        Email: ['', [Validators.required, Validators.email]],

        Gender: ['', Validators.required],

        BirthDate: ['', Validators.required],

        Password: ['', [Validators.required, Validators.minLength(8)]],

        ConfirmPassword: ['', Validators.required],

        AcceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  // Confirm Password Validation
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('Password')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;

    if (!confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Submit Register Form
  submit(): void {
    if (this.Form.invalid) {
      this.Form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.Form.getRawValue(),
      Role: 'Patient',
    };

    console.log('Register Payload:', payload);

    this.Data.post('AuthPatient/RegisterPatient', payload).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.ErrorHandlerService;
      },
    });
  }
}
