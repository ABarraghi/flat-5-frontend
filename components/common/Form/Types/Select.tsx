import { Controller, useFormContext } from 'react-hook-form';
import { type BaseField } from './type';
import { Radio, Select } from 'antd';
import classNames from 'classnames';

type Props = BaseField & {
  options: Array<{ label: string; key: string }>;
  customClass?: string;
  defaultValue: string;
};

export const FormSelect = ({ name, rules, options, customClass, defaultValue }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select {...field} defaultValue={defaultValue} className={classNames('h-[40px] xl:h-[52px]', customClass)}>
          {options.map((option, idx) => (
            <Select.Option value={option.key} key={option.key}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
    />
  );
};
