import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tabel',
  standalone: false,
  templateUrl: './tabel.html',
  styleUrl: './tabel.scss',
})
export class Tabel<T extends object> {
  tableData: T[] = [];
  rows: number = 5;
  totalRecords = 0;
  currentPage = 1;
  first: number = 0;

  @Input() bodytabel: any[] = [];
  @Input() templates: Record<string, TemplateRef<any>> = {};

  @Input()
  set data(value: T[]) {
    this.tableData = value ?? [];

    if (this.tableData.length === this.rows) {
      this.totalRecords = (this.currentPage + 1) * this.rows;
    } else if (this.tableData.length > 0) {
      this.totalRecords = (this.currentPage - 1) * this.rows + this.tableData.length;
    } else {
      this.totalRecords = this.currentPage * this.rows;
    }
  }

  // ====================== Pagnations ====================== //
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = Math.floor(event.first / event.rows) + 1;
    this.pageChange.emit(this.currentPage);
  }
}
