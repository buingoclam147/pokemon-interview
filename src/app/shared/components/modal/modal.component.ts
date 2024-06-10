import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'parent-container',
    'id': 'modal'
  }
})
export class ModalComponent {

}
