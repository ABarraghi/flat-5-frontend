import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { MapPinIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

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
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field?.value || false}
            disabled={disabled}
            className={cn('rounded-lg text-[16px] font-normal', className)}
          >
            {label}
          </Checkbox>
        )}
      />
    </>
  );
};
