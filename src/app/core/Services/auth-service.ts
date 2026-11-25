import { Injectable, signal, computed } from '@angular/core';

export interface LoginResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly ROLE_KEY = 'user_role';

  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  private _role = signal<string | null>(localStorage.getItem(this.ROLE_KEY));

  // Public Signals
  token = this._token.asReadonly();
  role = this._role.asReadonly();

  // Computed Signals
  isAuthenticated = computed(() => !!this._token());

  isAdmin = computed(() => this._role() === 'Admin');

  // Save Token And Role
  saveAuthData(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.ROLE_KEY, response.role);

    this._token.set(response.token);
    this._role.set(response.role);
  }

  // Get Token
  getToken(): string | null {
    return this._token();
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);

    this._token.set(null);
    this._role.set(null);
  }
  // Decode JWT Token
  private decodeToken(): any {
    const token = this._token();

    if (!token) return null;

    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');

      return JSON.parse(
        decodeURIComponent(
          atob(payload)
            .split('')
            .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join(''),
        ),
      );
    } catch {
      return null;
    }
  }

  // Decoded User Data
  userData = computed(() => this.decodeToken());

  // Get User ID
  userId = computed(() => this.userData()?.sub ?? this.userData()?.nameid);

  // Get Email
  userEmail = computed(() => this.userData()?.email);

  // Check Token Expiration
  isTokenExpired = computed(() => {
    const exp = this.userData()?.exp;

    return !exp || exp * 1000 < Date.now();
  });
}
