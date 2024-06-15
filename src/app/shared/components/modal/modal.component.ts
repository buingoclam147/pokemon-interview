import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
type TSizeModal = 'sm' | 'md' | 'lg';
const OPTION_SIZE_MODAL: Record<TSizeModal, number> = {
  'sm': 300,
  'md': 560,
  'lg': 780,
}

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'parent-container',
    'id': 'modal'
  }
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string | null = '';
  @Input() showFooter: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  optionSize = OPTION_SIZE_MODAL;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('modalContainer') modalContainer!: ElementRef;

  closeModal() {
    this.close.emit(false);
  }

  closeWithResult(result: boolean) {
    this.close.emit(result);
  }

  @HostListener('document:keydown.escape')
  onEscapeKeyPress() {
    this.closeModal();
  }
}
