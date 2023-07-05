import { z } from "zod";
import { addressSchemaRequest, addressSchemaResponse } from "./address.schema";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,100}$/;

const userEmailSchema = z.object({
  email: z.string().email().max(50, "Invalid email"),
});

const userPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]*$/,
      "Password must contain at least one letter and one number"
    ),
});

const userSchemaRequest = userPasswordSchema.extend({
  name: z.string().max(100),
  email: z.string().email().max(50),
  cpf: z.string().max(14),
  phone: z.string().max(16),
  birthdate: z.coerce.date(),
  description: z.string(),
  is_seller: z.boolean().default(false),
  address: addressSchemaRequest,
});

const userSchemaWithoutAdress = userSchemaRequest.omit({
  is_seller: true,
  address: true,
});

const userSchemaUpdate = userSchemaWithoutAdress.partial();

const userSchemaResponseWithoutPassword = userSchemaRequest
  .extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
  });

const userSchemaResponseWithoutPasswordAndAddress =
  userSchemaResponseWithoutPassword.omit({
    address: true,
  });

export {
  userEmailSchema,
  userPasswordSchema,
  userSchemaRequest,
  userSchemaUpdate,
  userSchemaWithoutAdress,
  userSchemaResponseWithoutPassword,
  userSchemaResponseWithoutPasswordAndAddress,
};
