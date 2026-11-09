import { describe, expect, it } from "vitest";

import { buildInspectionMessage, inspectionRequestSchema } from "@/lib/inspection";

describe("inspection request validation and WhatsApp message", () => {
  it("accepts complete details with a formatted local phone number", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "+234 803 314 5553",
      eventType: "Wedding",
      guests: "120",
      preferredDate: "2027-06-12",
    }).success).toBe(true);
  });

  it("rejects a phone number containing URL or markup characters", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "https://example.com",
      eventType: "Wedding",
      guests: "120",
      preferredDate: "2027-06-12",
    }).success).toBe(false);
  });

  it("rejects guest counts outside the supported 1–10,000 range", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "08033145553",
      eventType: "Wedding",
      guests: "0",
      preferredDate: "2027-06-12",
    }).success).toBe(false);
  });

  it("builds an encoded-message-ready booking request with all submitted details", () => {
    const message = buildInspectionMessage({
      fullName: "Amara Okafor",
      phone: "+234 803 314 5553",
      eventType: "Wedding",
      guests: 120,
      preferredDate: "2027-06-12",
    });

    expect(message).toContain("Hello Omega Events Arena, I'd like to arrange an inspection.");
    expect(message).toContain("Name: Amara Okafor\nPhone: +234 803 314 5553\nEvent: Wedding\nEstimated guests: 120\nPreferred date: 2027-06-12");
  });
});
