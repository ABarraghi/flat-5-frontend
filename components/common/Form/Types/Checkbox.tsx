import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { MapPinIcon } from '@heroicons/react/24/outline';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  label: string;
} & BaseField;

export const FormCheckbox = ({ name, rules, required, placeholder, disabled, label }: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <Checkbox
            control={<Checkbox {...field} />}
            {...field}
            checked={field.value}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            className="rounded-lg font-normal"
            allowClear
          >
            {label}
          </Checkbox>
        )}
      />
    </>
  );
};
