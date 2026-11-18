import { Component, inject } from '@angular/core';

import { Loading } from '../../core/Services/loading';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  loadingService = inject(Loading);
}
