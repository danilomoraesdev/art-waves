import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(100, "Message must be less than 100 characters"),
});