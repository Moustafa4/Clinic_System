import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/loader/loader';
import { Success } from './shared/success/success';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, Success],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
