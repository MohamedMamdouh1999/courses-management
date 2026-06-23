import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

import { SharedModule } from '../../../../shared/shared-module';

import { Courses } from '../../services/courses';

import { CourseStatus } from '../../enums/course-status';

@Component({
  selector: 'app-course-form',
  imports: [SharedModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coursesService = inject(Courses);

  courseId = signal<number | null>(null);
  isEditMode = signal(false);

  categories = ['Frontend', 'Backend', 'Design', 'Mobile', 'DevOps', 'Data'];
  statuses = Object.values(CourseStatus);

  form = this.fb.nonNullable.group({
    courseName: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', Validators.required],
    category: ['', Validators.required],
    duration: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    status: ['Active' as CourseStatus, Validators.required],
    description: ['', Validators.maxLength(500)],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) return;

    const course = this.coursesService.getCourseById(id);

    if (!course) {
      toast.error('Course not found');
      this.router.navigate(['/courses']);
      return;
    }

    this.courseId.set(id);
    this.isEditMode.set(true);

    this.form.patchValue({
      courseName: course.courseName,
      instructorName: course.instructorName,
      category: course.category,
      duration: course.duration,
      price: course.price,
      status: course.status,
      description: course.description ?? '',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEditMode() && this.courseId()) {
      this.coursesService.updateCourse(this.courseId()!, value);
      toast.success('Course updated successfully');
    } else {
      this.coursesService.addCourse(value);
      toast.success('Course created successfully');
    }

    this.router.navigate(['/courses']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control?.touched && !!control?.hasError(errorName);
  }
}