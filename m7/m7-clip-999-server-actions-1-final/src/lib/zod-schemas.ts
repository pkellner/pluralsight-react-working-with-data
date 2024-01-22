import { z } from "zod";

export const AttendeeSchema = z.object({
  id: z.string().nullable().optional(),
  firstName: z.string().min(1, "First name is required").nullable().optional(),
  lastName: z.string().min(1, "Last name is required").nullable().optional(),
  email: z.string().email("Invalid email format").min(10).nullable().optional(),
});

export const SpeakerSchema = z.object({
  id: z.number().optional(), // needed because we sometimes pass in no id to mean this gets added
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  company: z.string().optional(),
  twitterHandle: z.string().optional(),
  userBioShort: z.string().optional(),
  timeSpeaking: z.date(),
});
