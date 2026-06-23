import { CourseStatus } from "../enums/course-status";

export interface ICourse {
    id: number;
    courseName: string;
    instructorName: string;
    category: string;
    duration: number;
    price: number;
    status: string;
    description: CourseStatus;
    createdDate: Date;
}
