import { Component, computed, input, output } from '@angular/core';

import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-pagination',
  imports: [SharedModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  });

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    if (page === this.currentPage()) return;

    this.pageChange.emit(page);
  }
}
