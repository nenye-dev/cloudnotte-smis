
export type Student = {
  id: string | number;
  studentId?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  department?:string;
  gender?: string;
  phone?: string;
  height?: number;
  weight?: number;
  image?: string;
  isLocal?: boolean;
  address?: {
    city?: string;
    state?: string;
  };
  [key: string]: unknown;
};

export type StudentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  department:string;
  gender: string;
  phone: string;
  city: string;
  state: string;
  height: string;
  weight: string;
  image: string | File;
};

export type NotificationData = {
  type: "success" | "error";
  message: string;
};

export type ClassName =
  | "JSS 1"
  | "JSS 2"
  | "JSS 3"
  | "SSS 1"
  | "SSS 2"
  | "SSS 3";

export type StudentsByClass = Record<ClassName, Student[]>;

export type AddedStudentsByClass = Partial<StudentsByClass>;
