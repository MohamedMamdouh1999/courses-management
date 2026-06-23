import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout').then(c => c.Layout),
        children: [
            {
                path: 'courses',
                loadChildren: () => import('./features/courses/courses-module').then(m => m.CoursesModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/courses'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/courses'
    }
];
