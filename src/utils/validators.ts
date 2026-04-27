import { z } from "zod";

const urlNumber = z
  .string()
  .nullable()
  .transform((val) => (val ? Number(val) : null))
  .refine((val) => val === null || !isNaN(val))
  .catch(null);

export const carFilterSchema = z.object({
  keyword: z.string().nullable().catch(null),
  make: z.string().nullable().catch(null),
  minPrice: urlNumber,
  maxPrice: urlNumber,
  minYear: urlNumber,
  maxYear: urlNumber,
  maxMileage: urlNumber,
  condition: z.array(z.string()).catch([]),
  driveType: z.array(z.string()).catch([]),
  priceRating: z.array(z.string()).catch([]),
  features: z.array(z.string()).catch([]),
  fuelType: z.array(z.string()).catch([]),
});

export const uiValidationSchema = z
  .object({
    minPrice: z.number().nullable(),
    maxPrice: z.number().nullable(),
    minYear: z.number().nullable(),
    maxYear: z.number().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      data.minPrice !== null &&
      data.maxPrice !== null &&
      data.minPrice > data.maxPrice
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Min price cannot be greater than Max price.",
        path: ["priceError"],
      });
    }
    if (
      data.minYear !== null &&
      data.maxYear !== null &&
      data.minYear > data.maxYear
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Min year cannot be greater than Max year.",
        path: ["yearError"],
      });
    }
  });
