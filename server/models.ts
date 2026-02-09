// Interface for a Course object
export interface Course {
  id: number;
  description: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon?: string;
  category: string;
  lessonsCount?: number;
  seqNo: number;
  url: string;
  promo?: boolean;
  price: number;
}

// Interface for a Lesson object
export interface Lesson {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
  videoId?: string;
}

// Interface for a User object
export interface User {
  id: number;
  email: string;
  password: string;
  pictureUrl: string;
}
