import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Course, UpdateCourseData } from "../model/course";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

interface ApiResponse<T> {
  payload: T;
}

interface SearchParams {
  readonly filter?: string;
  readonly pageSize?: string;
  readonly courseId?: string;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly baseUrl = "/api";

  constructor(private readonly http: HttpClient) {}

  loadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`${this.baseUrl}/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    const params = new HttpParams()
      .set("pageSize", "10000")
      .set("courseId", courseId.toString());

    return this.http
      .get<ApiResponse<Lesson[]>>(`${this.baseUrl}/lessons`, { params })
      .pipe(
        map((res) => res.payload),
        shareReplay(),
      );
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<ApiResponse<Course[]>>(`${this.baseUrl}/courses`).pipe(
      map((res) => res.payload),
      shareReplay(),
    );
  }

  saveCourse(courseId: string, changes: UpdateCourseData): Observable<Course> {
    return this.http
      .put<Course>(`${this.baseUrl}/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    const params = new HttpParams()
      .set("filter", search)
      .set("pageSize", "100");

    return this.http
      .get<ApiResponse<Lesson[]>>(`${this.baseUrl}/lessons`, { params })
      .pipe(
        map((res) => res.payload),
        shareReplay(),
      );
  }
}
