import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { courseExistsGuard } from './guards/course-exists-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/courses-list/courses-list').then(c => c.CoursesList)
  },
  {
    path: 'details/:id',
    canMatch: [courseExistsGuard],
    loadComponent: () => import('./pages/course-details/course-details').then(c => c.CourseDetails)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/course-form/course-form').then(c => c.CourseForm)
  },
  {
    path: 'edit/:id',
    canMatch: [courseExistsGuard],
    loadComponent: () => import('./pages/course-form/course-form').then(c => c.CourseForm)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
