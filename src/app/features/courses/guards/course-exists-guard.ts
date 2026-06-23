import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { toast } from 'ngx-sonner';

import { Courses } from '../services/courses';

export const courseExistsGuard: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const coursesService = inject(Courses);
  const router = inject(Router);
  const translate = inject(TranslateService);

  const courseId = Number(segments.at(-1)?.path);

  const isInvalidId = !Number.isInteger(courseId) || courseId <= 0;
  const courseExists = coursesService.getCourseById(courseId);

  if (isInvalidId || !courseExists) {
    toast.error(translate.instant('TOASTS.COURSE_NOT_FOUND'));
    return router.createUrlTree(['/courses']);
  }

  return true;
};
