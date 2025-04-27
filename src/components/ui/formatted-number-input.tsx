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
  reverse?: boolean;
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
  reverse = false,
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
    <div
      className={`flex ${
        reverse ? "flex-row-reverse" : undefined
      } items-center border border-guide-500 rounded-md overflow-hidden`}
    >
      {symbol && (
        <span className="text-base font-bold p-4 text-guide-500 bg-guide-200">
          {symbol}
        </span>
      )}
      <Input
        type="text"
        inputMode="decimal"
        name={name}
        value={formattedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="border-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
        {...props}
      />
    </div>
  );
}

export { FormattedNumberInput };
