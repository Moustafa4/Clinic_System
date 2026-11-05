import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Tabel } from './tabel/tabel';
import { NoData } from './no-data/no-data';
@NgModule({
  declarations: [Tabel, NoData],
  imports: [CommonModule, TableModule, PaginatorModule, AngularSvgIconModule],
})
export class SharedModule {}
