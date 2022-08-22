export interface IOption {
  label: string;
  value: string;
};

export type SelectType = {
  options: IOption[];
  onSelectChange: (value: string) => void;
};