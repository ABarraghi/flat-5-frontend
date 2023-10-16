import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { type ReactNode } from 'react';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  showMapIcon?: boolean;
} & BaseField;

export const FormText = ({ name, rules, required, placeholder, disabled, showMapIcon }: Props) => {
  const { control, watch } = useFormContext();
  const value = watch(name);
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div style={{ position: 'relative' }}>
            <Input
              {...field}
              required={required}
              placeholder={placeholder}
              disabled={disabled}
              className="h-[40px] rounded-lg font-normal "
              allowClear
            />
            {!value && showMapIcon && (
              <MapPinIcon className="absolute right-0 top-2 z-10 h-5 w-5 text-[#2E2F44] opacity-50" />
            )}
          </div>
        )}
      />
    </>
  );
};
