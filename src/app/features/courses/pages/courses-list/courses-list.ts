import { Component, computed, inject, signal } from '@angular/core';
import { toast } from 'ngx-sonner';

import { SharedModule } from '../../../../shared/shared-module';

import { Courses } from '../../services/courses';

import { ICourse } from '../../interfaces/course';

import { CourseStatus } from '../../enums/course-status';

@Component({
  selector: 'app-courses-list',
  imports: [SharedModule],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList {
  private coursesService = inject(Courses);

  courses = signal<ICourse[]>(this.coursesService.getCourses());

  searchTerm = signal('');
  selectedStatus = signal<'All' | CourseStatus>('All');
  selectedCategory = signal('All');

  currentPage = signal(1);
  pageSize = signal(5);

  readonly categories = ['All', 'Frontend', 'Backend', 'Design', 'Mobile', 'DevOps', 'Data'];
  readonly statuses: Array<'All' | CourseStatus> = ['All', CourseStatus.Active, CourseStatus.Draft, CourseStatus.Archived];

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

  totalPages = computed(() => {
    return Math.max(Math.ceil(this.filteredCourses().length / this.pageSize()), 1);
  });

  paginatedCourses = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCourses().slice(startIndex, startIndex + this.pageSize());
  });

  totalCourses = computed(() => this.courses().length);
  activeCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Active).length);
  draftCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Draft).length);
  archivedCourses = computed(() => this.courses().filter(course => course.status === CourseStatus.Archived).length);

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

  deleteCourse(course: ICourse): void {
    const isConfirmed = confirm(`Are you sure you want to delete "${course.courseName}"?`);

    if (!isConfirmed) return;

    this.coursesService.deleteCourse(course.id);
    this.courses.set(this.coursesService.getCourses());
    this.currentPage.set(1);
    toast.success('Course deleted successfully');
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  getStatusClass(status: CourseStatus): string {
    const statusClasses: Record<CourseStatus, string> = {
      [CourseStatus.Active]: 'status-active',
      [CourseStatus.Draft]: 'status-draft',
      [CourseStatus.Archived]: 'status-archived',
    };
    console.log(status, statusClasses);
    return statusClasses[status];
  }

  getInstructorInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }
}