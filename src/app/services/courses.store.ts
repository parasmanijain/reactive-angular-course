import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

interface ApiResponse<T> {
  payload: T;
}

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  private readonly subject = new BehaviorSubject<Course[]>([]);

  readonly courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly loading: LoadingService,
    private readonly messages: MessagesService,
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses(): void {
    const loadCourses$ = this.http
      .get<ApiResponse<Course[]>>("/api/courses")
      .pipe(
        map((response) => response.payload),
        catchError((err: HttpErrorResponse) => {
          const message = "Could not load courses";
          this.messages.showErrors(message);
          console.error(message, err);
          return throwError(() => err);
        }),
        tap((courses) => this.subject.next(courses)),
      );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<Course> {
    const courses = this.subject.getValue();

    const index = courses.findIndex((course) => course.id === courseId);

    if (index === -1) {
      throw new Error(`Course with id ${courseId} not found`);
    }

    const newCourse: Course = {
      ...courses[index]!,
      ...changes,
    };

    const newCourses: Course[] = [...courses];
    newCourses[index] = newCourse;

    this.subject.next(newCourses);

    return this.http.put<Course>(`/api/courses/${courseId}`, changes).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = "Could not save course";
        console.error(message, err);
        this.messages.showErrors(message);
        return throwError(() => err);
      }),
      shareReplay(),
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo),
      ),
    );
  }
}
