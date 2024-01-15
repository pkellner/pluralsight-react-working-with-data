import { z } from "zod";

export const AttendeeSchema = z.object({
  id: z.string().nullable().optional(),
  firstName: z.string().min(1, "First name is required").nullable().optional(),
  lastName: z.string().min(1, "Last name is required").nullable().optional(),
  email: z.string().email("Invalid email format").min(10).nullable().optional(),
});
