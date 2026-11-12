import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from './Componnents/landing-page/landing-page';
import { Header } from './Componnents/landing-page/header/header';
import { Footer } from './Componnents/footer/footer';
import { Login } from './Module/Auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage, Header, Footer, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Clinic_System');
}
