import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.scss"],
  providers: [LoadingService, MessagesService],
  standalone: false,
})
export class CourseDialogComponent {
  readonly form: FormGroup;
  readonly course = inject<Course>(MAT_DIALOG_DATA);

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CourseDialogComponent>,
    private readonly coursesStore: CoursesStore,
  ) {
    this.form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required],
    });
  }

  save(): void {
    const changes = this.form.value as Partial<Course>;

    this.coursesStore.saveCourse(this.course.id, changes).subscribe();

    this.dialogRef.close(changes);
  }

  close(): void {
    this.dialogRef.close();
  }
}
