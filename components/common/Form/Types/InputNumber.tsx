import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import React, { type ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  showMapIcon?: boolean;
  suffix: ReactNode;
} & BaseField;

export const FormInputNumber = ({ name, rules, required, placeholder, disabled, showMapIcon, suffix }: Props) => {
  const { control, watch, setValue } = useFormContext();
  const value = watch(name);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setValue(name, inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value?.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    setValue(name, valueTemp.replace(/0*(\d+)/, '$1'));
  };
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              placeholder={placeholder}
              disabled={disabled}
              className="h-[40px] max-w-[120px] rounded-lg font-normal"
              allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
              suffix={suffix}
            />
          </div>
        )}
      />
    </>
  );
};
