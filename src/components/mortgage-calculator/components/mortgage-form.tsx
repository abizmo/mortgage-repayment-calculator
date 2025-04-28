"use client";

import { CalculatorIcon } from "lucide-react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

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
import { defaultValues, formSchema } from "@/constants";
import { Calculator, Result } from "@/types";
import calculateRepayments from "@/utils/calculate-repayments";
import { zodResolver } from "@hookform/resolvers/zod";

import MortgageField from "./mortgage-field";
import MortgageOption from "./mortgage-option";

interface MortgageFormProps {
  onCalculate: (props: Result) => void;
  onReset: () => void;
}

function MortgageForm({ onCalculate, onReset }: MortgageFormProps) {
  const form = useForm<Calculator>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: Calculator) => {
    const { type, ...numbers } = values;
    const { interestsOnly, ...results } = calculateRepayments(numbers);

    onCalculate(type === "repayment" ? results : interestsOnly);
  };

  const handleReset = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.reset();
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
                    value={field.value}
                    onValueChange={field.onChange}
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
