import { z } from 'zod';

export const profileSchema = z.object({
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    bio: z.string().max(100, 'bio ไม่เกิน 100 ตัวอักษร').optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;