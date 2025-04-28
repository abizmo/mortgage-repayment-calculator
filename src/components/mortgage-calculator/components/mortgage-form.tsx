"use client";

import { CalculatorIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";

import MortgageField from "./mortgage-field";
import MortgageOption from "./mortgage-option";

const formSchema = z.object({
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

export type Result = {
  monthly: number;
  total: number;
};

interface MortgageFormProps {
  onCalculate: (props: Result) => void;
  onReset: () => void;
}

type Calculator = z.infer<typeof formSchema>;

function MortgageForm({ onCalculate, onReset }: MortgageFormProps) {
  const [radioValue, setRadioValue] = useState<string>("");
  const form = useForm<Calculator>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 0, term: 0, interestRate: 0 },
  });

  const calculateRepayments = ({
    amount,
    interestRate,
    term,
  }: Omit<Calculator, "type">) => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = term * 12;
    const x = (1 + monthlyInterestRate) ** numberOfPayments;
    const denominator = x - 1;
    const numerator = monthlyInterestRate * x;

    const monthly = (amount * numerator) / denominator;
    const total = monthly * numberOfPayments;

    return {
      monthly,
      total,
      interestsOnly: {
        monthly: monthly - amount / numberOfPayments,
        total: total - amount,
      },
    };
  };

  const onSubmit = (values: Calculator) => {
    const { type, ...numbers } = values;
    const { interestsOnly, ...results } = calculateRepayments(numbers);

    onCalculate(type === "repayment" ? results : interestsOnly);
  };

  const handleReset = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.reset();
    setRadioValue("");
    onReset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={handleReset}
        className="space-y-8"
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row justify-between sm:items-center">
          <CardTitle>Mortgage Calculator</CardTitle>
          <Button className="relative" type="reset" variant="link" size="sm">
            <span className="absolute -inset-3  [@media(pointer:fine)]:hidden"></span>
            Clear All
          </Button>
        </div>
        <MortgageField
          control={form.control}
          name="amount"
          label="Mortgage Amount"
          symbol="€"
        />
        <div className="grid items-start sm:grid-cols-2 gap-x-6 gap-y-8">
          <MortgageField
            control={form.control}
            name="term"
            label="Mortgage Term"
            symbol="years"
          />
          <MortgageField
            control={form.control}
            name="interestRate"
            label="Interest Rate"
            symbol="%"
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3 gap-4">
              <FormLabel>Mortgage Type</FormLabel>
              <div className="grid gap-2">
                <FormControl>
                  <RadioGroup
                    value={radioValue}
                    onValueChange={(value) => {
                      setRadioValue(value);
                      field.onChange(value);
                    }}
                    className="flex flex-col"
                  >
                    <MortgageOption value="repayment" label="Repayment" />
                    <MortgageOption
                      value="interest-only"
                      label="Interest Only"
                    />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">
          <CalculatorIcon />
          Calculate Repayments
        </Button>
      </form>
    </Form>
  );
}

export default MortgageForm;
