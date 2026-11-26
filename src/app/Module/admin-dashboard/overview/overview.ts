import { Component } from '@angular/core';
import { Statistics } from './statistics/statistics';
import { Chart } from './chart/chart';
import { Actions } from './actions/actions';

@Component({
  imports: [Statistics, Chart, Actions],
  selector: 'app-overview',
  styleUrl: './overview.scss',
  templateUrl: './overview.html',
})
export class Overview {}
