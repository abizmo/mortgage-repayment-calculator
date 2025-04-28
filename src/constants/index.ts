import { z } from "zod";

export const formSchema = z.object({
  amount: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),
  term: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "Term must be a number",
    })
    .int("Term must be a whole number")
    .positive("Term must be greater than 0"),
  interestRate: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "Interest rate must be a number",
    })
    .positive("Interest rate must be greater than or equal to 0"),
  type: z.enum(["repayment", "interest-only"], {
    required_error: "This field is required",
  }),
});

export const defaultValues = { amount: 0, term: 0, interestRate: 0 };
