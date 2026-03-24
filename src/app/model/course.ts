export type CourseCategory = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export interface Course {
  readonly id: string;
  readonly description: string;
  readonly longDescription: string;
  readonly seqNo: number;
  readonly iconUrl: string;
  readonly price: number;
  readonly uploadedImageUrl: string;
  readonly courseListIcon: string;
  readonly category: CourseCategory;
  readonly lessonsCount: number;
}

export function sortCoursesBySeqNo(c1: Course, c2: Course): number {
  return c1.seqNo - c2.seqNo;
}

// Type guard for course category validation
export function isValidCourseCategory(
  category: string,
): category is CourseCategory {
  return ["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(category);
}

// Utility type for creating new courses
export type CreateCourseData = Omit<Course, "id">;

// Utility type for updating courses
export type UpdateCourseData = Partial<Omit<Course, "id">>;
