import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toast } from 'ngx-sonner';

import { SharedModule } from '../../../../shared/shared-module';

import { StatusBadge } from '../../components/status-badge/status-badge';
import { Pagination } from '../../components/pagination/pagination';

import { Courses } from '../../services/courses';

import { ICourse } from '../../interfaces/course';

import { CourseStatus } from '../../enums/course-status';

type SortColumn =
  | 'id'
  | 'courseName'
  | 'instructorName'
  | 'category'
  | 'duration'
  | 'price'
  | 'status'
  | 'createdDate';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-courses-list',
  imports: [SharedModule, StatusBadge, Pagination],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList {
  private coursesService = inject(Courses);
  private translate = inject(TranslateService);

  courses = signal<ICourse[]>(this.coursesService.getCourses());

  searchTerm = signal('');
  selectedStatus = signal<'All' | CourseStatus>('All');
  selectedCategory = signal('All');

  currentPage = signal(1);
  pageSize = signal(5);

  isLoading = signal(true);

  courseToDelete = signal<ICourse | null>(null);

  sortColumn = signal<SortColumn>('createdDate');
  sortDirection = signal<SortDirection>('desc');

  readonly skeletonRows = Array.from({ length: 5 });

  readonly categories = ['All', 'Frontend', 'Backend', 'Design', 'Mobile', 'DevOps', 'Data'];
  readonly statuses: Array<'All' | CourseStatus> = ['All', CourseStatus.Active, CourseStatus.Draft, CourseStatus.Archived];

  private readonly categoryTranslationKeys: Record<string, string> = {
    All: 'FILTERS.ALL_CATEGORIES',
    Frontend: 'CATEGORIES.FRONTEND',
    Backend: 'CATEGORIES.BACKEND',
    Design: 'CATEGORIES.DESIGN',
    Mobile: 'CATEGORIES.MOBILE',
    DevOps: 'CATEGORIES.DEVOPS',
    Data: 'CATEGORIES.DATA',
  };

  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    const category = this.selectedCategory();

    return this.courses().filter(course => {
      const matchesSearch = course.courseName.toLowerCase().includes(search);
      const matchesStatus = status === 'All' || course.status === status;
      const matchesCategory = category === 'All' || course.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  });

  sortedCourses = computed(() => {
    const courses = [...this.filteredCourses()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    return courses.sort((firstCourse, secondCourse) => {
      const firstValue = firstCourse[column];
      const secondValue = secondCourse[column];

      if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        return direction === 'asc' ? firstValue - secondValue : secondValue - firstValue;
      }

      return direction === 'asc' ? String(firstValue).localeCompare(String(secondValue)) : String(secondValue).localeCompare(String(firstValue));
    });
  });

  totalPages = computed(() => {
    return Math.max(Math.ceil(this.filteredCourses().length / this.pageSize()), 1);
  });

  paginatedCourses = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.sortedCourses().slice(startIndex, startIndex + this.pageSize());
  });

  totalCourses = computed(() => this.courses().length);
  activeCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Active).length);
  draftCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Draft).length);
  archivedCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Archived).length);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 400);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  onStatusChange(value: 'All' | CourseStatus): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
  }

  onCategoryChange(value: string): void {
    this.selectedCategory.set(value);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('All');
    this.selectedCategory.set('All');
    this.currentPage.set(1);
  }

  openDeleteModal(course: ICourse): void {
    this.courseToDelete.set(course);
  }

  closeDeleteModal(): void {
    this.courseToDelete.set(null);
  }

  confirmDeleteCourse(): void {
    const selectedCourse = this.courseToDelete();

    if (!selectedCourse) return;

    this.coursesService.deleteCourse(selectedCourse.id);
    this.courses.set(this.coursesService.getCourses());
    this.currentPage.set(1);
    this.courseToDelete.set(null);

    toast.success(this.translate.instant('TOASTS.COURSE_DELETED'));
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  sortBy(column: SortColumn): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }

    this.currentPage.set(1);
  }

  getSortIcon(column: SortColumn): string {
    if (this.sortColumn() !== column) return '↕';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }

  getInstructorInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }

  getStatusLabelKey(status: 'All' | CourseStatus): string {
    if (status === 'All') return 'FILTERS.ALL_STATUSES';
    return `STATUSES.${status.toUpperCase()}`;
  }

  getCategoryLabelKey(category: string): string {
    return this.categoryTranslationKeys[category] ?? category;
  }
}
