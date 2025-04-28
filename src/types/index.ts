import { z } from "zod";

import { formSchema } from "@/constants";

export type Result = {
  monthly: number;
  total: number;
};

export type Calculator = z.infer<typeof formSchema>;
