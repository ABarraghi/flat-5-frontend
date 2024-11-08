import { Controller, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { Checkbox } from '@/components/ui/checkbox';
import { type BaseField } from '@/components/common/Form/Types/type';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  label: string;
  className?: string;
} & BaseField;

export const FormCheckbox = ({ name, rules, required, placeholder, disabled, label, className }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control as any}
      rules={rules}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            {...field}
            checked={field?.value || false}
            disabled={disabled}
            className={cn('rounded-lg text-[16px] font-normal', className)}
          />
          <label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        </div>
      )}
    />
  );
};
