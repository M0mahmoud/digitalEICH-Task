import { z } from "zod";

export const newProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  // images: z.array(z.string().url({ message: "Each image must be a valid URL" })).optional(),
});

export const editProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().min(1, { message: "Price must be a positive number" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  // images: z.array(z.string().url({ message: "Each image must be a valid URL" })).optional(),
});
