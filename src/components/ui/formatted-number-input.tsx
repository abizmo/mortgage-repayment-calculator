import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  useEffect,
  useState
} from "react";

import { Input } from "./input";

interface FormattedNumberInputProps extends ComponentProps<"input"> {
  symbol?: string;
  onValueChange?: (value: number) => void;
}

const formatNumber = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "";

  const numStr = value.toString();
  const [wholePart, decimalPart] = numStr.split(".");
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart !== undefined) return `${formattedWholePart}.${decimalPart}`;

  return formattedWholePart;
};

function FormattedNumberInput({
  symbol,
  onValueChange,
  value,
  name,
  ...props
}: FormattedNumberInputProps) {
  const [formattedValue, setFormattedValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    const stringValue = value?.toString() ?? "";
    setRawValue(stringValue);
    setFormattedValue(formatNumber(stringValue));
  }, [value]);
  const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
    evt.target.select();
  };

  const handleBlur = () => {
    setFormattedValue(formatNumber(rawValue));
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.target.value;
    const cleanedInput = inputText.replace(/,/g, "");

    if (cleanedInput === "" || /^\d*\.?\d{0,2}$/.test(cleanedInput)) {
      setRawValue(cleanedInput);
      setFormattedValue(formatNumber(cleanedInput));
      const numericValue = cleanedInput === "" ? 0 : parseFloat(cleanedInput);
      onValueChange?.(numericValue);
    }
  };

  return (
    <div className="relative">
      {symbol && (
        <div>
          <span>{symbol}</span>
        </div>
      )}
      <Input
        type="text"
        inputMode="decimal"
        name={name}
        value={formattedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  );
}

export { FormattedNumberInput };
