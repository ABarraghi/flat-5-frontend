import { type RegisterOptions } from 'react-hook-form';

export interface BaseField {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions;
  className?: string;
}
