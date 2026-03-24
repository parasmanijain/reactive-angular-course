import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { startWith, tap, map } from "rxjs/operators";
import { Observable, combineLatest } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

interface CourseData {
  readonly course: Course | null;
  readonly lessons: readonly Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CourseComponent implements OnInit {
  data$!: Observable<CourseData>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.paramMap.get("courseId");

    if (!courseIdParam) {
      throw new Error("Course ID parameter is required");
    }

    const courseId = parseInt(courseIdParam, 10);

    if (isNaN(courseId)) {
      throw new Error("Course ID must be a valid number");
    }

    const course$ = this.coursesService
      .loadCourseById(courseId)
      .pipe(startWith(null));

    const lessons$ = this.coursesService
      .loadAllCourseLessons(courseId)
      .pipe(startWith([] as readonly Lesson[]));

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(
        ([course, lessons]): CourseData => ({
          course,
          lessons,
        }),
      ),
      tap((data) => console.log("Course data loaded:", data)),
    );
  }
}
