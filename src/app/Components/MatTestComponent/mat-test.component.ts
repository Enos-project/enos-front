import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mat-test-root',
  templateUrl: './mat-test.component.html',
  styleUrls: ['./mat-test.component.scss']
})
export class MatTestComponent {

  constructor(private snackBar: MatSnackBar) {}

  title = 'test';
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  openSnackBar() {
    this.snackBar.open('message', 'action', {
      duration: 2000,
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
];
