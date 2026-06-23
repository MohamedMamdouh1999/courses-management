import { CourseStatus } from "../enums/course-status";

export interface ICourseFormValue {
    courseName: string;
    instructorName: string;
    category: string;
    duration: number;
    price: number;
    status: CourseStatus;
    description?: string;
}
