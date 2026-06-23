import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toast } from 'ngx-sonner';

import { SharedModule } from '../../../../shared/shared-module';

import { StatusBadge } from '../../components/status-badge/status-badge';

import { Courses } from '../../services/courses';

import { ICourse } from '../../interfaces/course';

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

  course = signal<ICourse | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => this.selectCourse(Number(params.get('id'))));
  }

  selectCourse(id: number): void {
    const selectedCourse = this.coursesService.getCourseById(id);

    if (!selectedCourse) {
      toast.error('Course not found');
      this.router.navigate(['/courses']);
      return;
    }

    this.course.set(selectedCourse);
  }
}