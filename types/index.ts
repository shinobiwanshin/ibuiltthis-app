export type FormState = {
  success: boolean;
  errors?: Record<string, string[]> | unknown;
  message: string;
};
