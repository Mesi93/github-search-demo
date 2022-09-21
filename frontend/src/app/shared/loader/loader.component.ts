import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() loader!: boolean | null;
  @Input() color? = '#00695c';
  @Input() diameter?: number = 150;
  @Input() strokeWidth?: number;
  @Input() value?: number;

  constructor() {}
}
