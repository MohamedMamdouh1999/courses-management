import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { toast } from 'ngx-sonner';

import { SharedModule } from '../../../../shared/shared-module';

import { StatusBadge } from '../../components/status-badge/status-badge';

import { Courses } from '../../services/courses';

import { ICourse } from '../../interfaces/course';
import { CourseStatus } from '../../enums/course-status';

@Component({
  selector: 'app-course-details',
  imports: [SharedModule, StatusBadge],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
})
export class CourseDetails implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coursesService = inject(Courses);
  private translate = inject(TranslateService);

  course = signal<ICourse | null>(null);

  private readonly categoryTranslationKeys: Record<string, string> = {
    Frontend: 'CATEGORIES.FRONTEND',
    Backend: 'CATEGORIES.BACKEND',
    Design: 'CATEGORIES.DESIGN',
    Mobile: 'CATEGORIES.MOBILE',
    DevOps: 'CATEGORIES.DEVOPS',
    Data: 'CATEGORIES.DATA',
  };

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => this.selectCourse(Number(params.get('id'))));
  }

  selectCourse(id: number): void {
    const selectedCourse = this.coursesService.getCourseById(id);

    if (!selectedCourse) {
      toast.error(this.translate.instant('TOASTS.COURSE_NOT_FOUND'));
      this.router.navigate(['/courses']);
      return;
    }

    this.course.set(selectedCourse);
  }

  getCategoryLabelKey(category: string): string {
    return this.categoryTranslationKeys[category] ?? category;
  }

  getStatusLabelKey(status: CourseStatus): string {
    return `STATUSES.${status.toUpperCase()}`;
  }
}
