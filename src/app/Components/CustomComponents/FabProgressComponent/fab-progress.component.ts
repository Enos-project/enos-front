import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fab-progress',
  templateUrl: './fab-progress.component.html',
  styleUrls: ['./fab-progress.component.scss']
})
export class FabProgressComponent {

  @Input() percentage: number;
  @Input() icon: string;

  constructor() {}
}
