export interface Certification {
  status: "success" | "unauthorized" | "error";
  name: string;
  message?: string;
}
