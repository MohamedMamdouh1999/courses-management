# Course Management Dashboard

A responsive Angular application for managing courses in an educational platform.

## Technologies Used

* Angular 22
* TypeScript
* Reactive Forms
* Angular Routing
* Bootstrap
* ngx-sonner
* LocalStorage

## Features

* View courses
* Search courses by course name
* Filter courses by status and category
* Add new course
* Edit existing course
* Delete course with confirmation
* View course details
* Pagination
* Toast notifications
* Responsive layout
* Lazy-loaded courses module

## Data Source

The application uses browser LocalStorage to store and manage course records.

Initial sample courses are automatically added when the application runs for the first time.

## How to Run

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Or run without automatically opening the browser:

```bash
npm run open
```

Then open:

```txt
http://localhost:4200
```

## Build

To build the project for production:

```bash
npm run build
```

## Project Structure

```txt
src/app/
  layout/
    components/
      navbar/
      sidebar/
  shared/
  features/
    courses/
      enums/
      interfaces/
      pages/
        courses-list/
        course-form/
        course-details/
      services/
```

## Notes

* The project uses LocalStorage instead of a real backend API.
* Full CRUD behavior is implemented on the client side.
* Course data persists in the browser until LocalStorage is cleared.
* The Courses feature is lazy-loaded.