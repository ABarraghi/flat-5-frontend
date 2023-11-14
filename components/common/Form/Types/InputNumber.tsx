import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import React, { type ReactNode, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import CustomErrorMessage from '@/components/common/CustomErrorMessage';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  suffix: ReactNode;
  customClass?: string;
  isDebounce?: boolean;
  timeDebounce?: number;
  required: boolean;
  error: string;
} & BaseField;

export const FormInputNumber = ({
  name,
  rules,
  placeholder,
  disabled,
  suffix,
  customClass,
  isDebounce = false,
  timeDebounce = 0,
  error,
}: Props) => {
  const { control, setValue, getValues } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const handleChange = (inputValue: string) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setValue(name, parseInt(inputValue));
    }
  };
  const debounceChangeValue = useDebouncedCallback((inputValue: string) => {
    handleChange(inputValue);
  }, timeDebounce || 500);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      setInputValue(inputValue);
    }
    isDebounce ? debounceChangeValue(inputValue) : handleChange(inputValue);
  };

  const handleBlur = () => {
    let valueTemp = inputValue;
    if (inputValue?.charAt(inputValue.length - 1) === '.' || inputValue === '-') {
      valueTemp = inputValue.slice(0, -1);
    }
    setValue(name, valueTemp.replace(/0*(\d+)/, '$1'));
  };
  useEffect(() => {
    const value = getValues(name);
    if (value) {
      setInputValue(value);
    }
  }, [getValues, name]);
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => {
          return (
            <div className={cn(customClass)}>
              <Input
                {...field}
                value={inputValue}
                onChange={onChangeValue}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                className="h-[52px] rounded-lg font-normal"
                allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
                suffix={suffix}
              />
              {error && <CustomErrorMessage message={error} />}
            </div>
          );
        }}
      />
    </>
  );
};
