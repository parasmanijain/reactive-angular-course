import { Component, Input, OnInit } from "@angular/core";
import { Lesson } from "../model/lesson";

@Component({
  selector: "lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.scss"],
  standalone: false,
})
export class LessonComponent implements OnInit {
  @Input()
  lesson!: Lesson;

  constructor() {}

  ngOnInit() {}
}
