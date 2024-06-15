import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SpinService } from '@core/services/spin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'spin',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="spinning-global" *ngIf="ss.loading$ | async" #spin>
  <div class="spinning"></div>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SpinComponent implements OnInit {
  protected readonly ss = inject(SpinService)
  @ViewChild('spin') spin!: ElementRef<HTMLDivElement>;
  isLoading$!: Observable<boolean>;

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
