import { CheckboxOption } from "@/components/filters/CheckboxGroup";
import { SelectOption } from "@/components/filters/FilterSelect";

export const CONDITION_OPTIONS: CheckboxOption[] = [
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
  { label: "Certified", value: "Certified", hasTooltip: true },
];

export const DRIVE_TYPE_OPTIONS: CheckboxOption[] = [
  { label: "AWD/4WD", value: "AWD/4WD" },
  { label: "Front Wheel Drive", value: "Front Wheel Drive" },
  { label: "Rear Wheel Drive", value: "Rear Wheel Drive" },
];

export const PRICE_RATING_OPTIONS: CheckboxOption[] = [
  { label: "Good Price", value: "Good Price" },
  { label: "Great Price", value: "Great Price" },
];

export const MAKE_OPTIONS: SelectOption[] = [
  { label: "Toyota", value: "Toyota" },
  { label: "Chevrolet", value: "Chevrolet" },
  { label: "Dodge", value: "Dodge" },
  { label: "BMW", value: "BMW" },
];

export const MILEAGE_OPTIONS: SelectOption[] = [
  { label: "20,000 or less", value: "20000" },
  { label: "50,000 or less", value: "50000" },
  { label: "100,000 or less", value: "100000" },
];

export const ONLINE_PAPER_OPTIONS = [
  { value: "true", label: "Buy 100% online" },
  { value: "false", label: "Paper only" },
];
