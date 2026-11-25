import { Component } from '@angular/core';
import { Statistics } from './statistics/statistics';
import { Chart } from './chart/chart';
import { Actions } from './actions/actions';
import { Header } from '../../../shared/header/header';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  imports: [Statistics, Chart, Actions, Header, AdminSidebar],
  selector: 'app-overview',
  styleUrl: './overview.scss',
  templateUrl: './overview.html',
})
export class Overview {}
