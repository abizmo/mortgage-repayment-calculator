import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface MortgageOptionProps {
  label: string;
  value: string;
}

function MortgageOption({ label, value }: MortgageOptionProps) {
  return (
    <FormItem className="relative group has-checked:border-primary has-checked:bg-primary/15 flex items-center space-x-4 space-y-0 border border-guide-500 p-4 rounded-md hover:[&_*]:cursor-pointer">
      <FormControl>
        <RadioGroupItem
          value={value}
          className="group-has-checked:border-primary"
        />
      </FormControl>
      <FormLabel className="text-guide-900 font-bold">
        <span className="absolute inset-0"></span>
        {label}
      </FormLabel>
    </FormItem>
  );
}
export default MortgageOption;
