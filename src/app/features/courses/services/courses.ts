import { Injectable } from '@angular/core';

import { ICourse } from '../interfaces/course';
import { ICourseFormValue } from '../interfaces/course-form-value';

import { CourseStatus } from '../enums/course-status';

@Injectable({
    providedIn: 'root',
})
export class Courses {
    private readonly storageKey = 'courses-management-data';

    private readonly initialCourses: ICourse[] = [
        {
            id: 1,
            courseName: 'Angular Fundamentals',
            instructorName: 'Ahmed Ali',
            category: 'Frontend',
            duration: 20,
            price: 1500,
            status: CourseStatus.Active,
            description:'Learn Angular basics including components, routing, services, and forms.',
            createdDate: '2026-06-01',
        },
        {
            id: 2,
            courseName: 'Advanced TypeScript',
            instructorName: 'Sarah Hassan',
            category: 'Frontend',
            duration: 16,
            price: 2000,
            status: CourseStatus.Draft,
            description: 'Deep dive into TypeScript types, interfaces, generics, and advanced patterns.',
            createdDate: '2026-06-05',
        },
        {
            id: 3,
            courseName: 'Node.js API Development',
            instructorName: 'Mohamed Samir',
            category: 'Backend',
            duration: 24,
            price: 2500,
            status: CourseStatus.Archived,
            description: 'Build REST APIs using Node.js, Express, validation, and clean architecture.',
            createdDate: '2026-06-10',
        },
        {
            id: 4,
            courseName: 'UI/UX Design Basics',
            instructorName: 'Nour Adel',
            category: 'Design',
            duration: 12,
            price: 1200,
            status: CourseStatus.Archived,
            description: 'Understand the foundations of user interface and user experience design.',
            createdDate: '2026-06-12',
        },
    ];

    getCourses(): ICourse[] {
        const savedCourses = localStorage.getItem(this.storageKey);

        if (!savedCourses) {
            this.saveCourses(this.initialCourses);
            return this.initialCourses;
        }

        return JSON.parse(savedCourses) as ICourse[];
    }

    getCourseById(id: number): ICourse | undefined {
        return this.getCourses().find(course => course.id === id);
    }

    addCourse(value: ICourseFormValue): ICourse {
        const courses = this.getCourses();

        const newCourse: ICourse = {
            id: this.generateId(courses),
            ...value,
            duration: Number(value.duration),
            price: Number(value.price),
            createdDate: new Date().toISOString().split('T')[0],
        };

        this.saveCourses([newCourse, ...courses]);
        return newCourse;
    }

    updateCourse(id: number, value: ICourseFormValue): ICourse | undefined {
        const courses = this.getCourses();
        const courseIndex = courses.findIndex(course => course.id === id);

        if (courseIndex === -1) return undefined;

        const updatedCourse: ICourse = {
            ...courses[courseIndex],
            ...value,
            duration: Number(value.duration),
            price: Number(value.price),
        };

        courses[courseIndex] = updatedCourse;
        this.saveCourses(courses);

        return updatedCourse;
    }

    deleteCourse(id: number): void {
        const filteredCourses = this.getCourses().filter(course => course.id !== id);
        this.saveCourses(filteredCourses);
    }

    private saveCourses(courses: ICourse[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(courses));
    }

    private generateId(courses: ICourse[]): number {
        if (!courses.length) return 1;
        return Math.max(...courses.map(course => course.id)) + 1;
    }
}