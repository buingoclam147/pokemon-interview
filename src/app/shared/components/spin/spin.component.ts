import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinService } from '../../../core/services/spin.service';

@Component({
  selector: 'spin',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="spinning-global" *ngIf="ss.loading$ | async" #spin>
  <div class="spinning"></div>
</div>`,
})
export class SpinComponent {
  @ViewChild('spin') spin!: ElementRef<HTMLDivElement>;
  isLoading$!: Observable<boolean>;
  constructor(protected ss: SpinService) { }

  ngOnInit() {
    // Lắng nghe sự kiện keydown để ngăn chặn sự kiện bàn phím
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Ngăn chặn sự kiện bàn phím khi #spin tồn tại
    if (this.spin && this.spin?.nativeElement) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
