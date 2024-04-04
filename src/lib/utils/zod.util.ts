import { z } from "zod";

export function parseZod<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  formData: FormData,
) {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      error: {
        errors: result.error.flatten().fieldErrors,
      },
    };
  }

  return { data: result.data };
}
