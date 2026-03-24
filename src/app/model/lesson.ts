export interface Lesson {
  readonly id: number;
  readonly description: string;
  readonly duration: string;
  readonly seqNo: number;
  readonly courseId: number;
  readonly videoId: string;
}

// Utility type for creating new lessons
export type CreateLessonData = Omit<Lesson, "id">;

// Utility type for updating lessons
export type UpdateLessonData = Partial<Omit<Lesson, "id" | "courseId">>;

// Type guard for lesson validation
export function isValidLesson(obj: unknown): obj is Lesson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "description" in obj &&
    "duration" in obj &&
    "seqNo" in obj &&
    "courseId" in obj &&
    "videoId" in obj &&
    typeof (obj as Lesson).id === "number" &&
    typeof (obj as Lesson).description === "string" &&
    typeof (obj as Lesson).duration === "string" &&
    typeof (obj as Lesson).seqNo === "number" &&
    typeof (obj as Lesson).courseId === "number" &&
    typeof (obj as Lesson).videoId === "string"
  );
}
