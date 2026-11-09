import { z } from "zod";

export const inspectionRequestSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24, "Phone number must be 24 characters or fewer.").regex(/^\+?[\d\s().-]+$/, "Use digits and standard phone punctuation only."),
  eventType: z.string().trim().min(1, "Please choose an event type.").max(60, "Event type is too long."),
  guests: z.coerce.number({ message: "Enter an estimated guest count." }).int("Guest count must be a whole number.").min(1, "Guest count must be at least 1.").max(10000, "Guest count must be 10,000 or fewer."),
  preferredDate: z.string().date("Please choose a valid preferred date."),
});

export type InspectionRequest = z.infer<typeof inspectionRequestSchema>;

export function buildInspectionMessage(request: InspectionRequest) {
  return [
    "Hello Omega Events Arena, I'd like to arrange an inspection.",
    "",
    `Name: ${request.fullName}`,
    `Phone: ${request.phone}`,
    `Event: ${request.eventType}`,
    `Estimated guests: ${request.guests}`,
    `Preferred date: ${request.preferredDate}`,
  ].join("\n");
}
