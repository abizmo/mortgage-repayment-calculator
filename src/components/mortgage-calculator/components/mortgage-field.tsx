import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { FormattedNumberInput } from "@/components/ui/formatted-number-input";

interface MortgageFieldProps {
  control: any;
  name: string;
  label: string;
  symbol: string;
}

function MortgageField({ control, name, label, symbol }: MortgageFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="grid gap-2">
            <FormControl>
              <FormattedNumberInput
                symbol={symbol}
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default MortgageField;
