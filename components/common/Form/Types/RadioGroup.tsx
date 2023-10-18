import { Controller, useFormContext } from 'react-hook-form';
import { type BaseField } from './type';
import { Radio } from 'antd';

type Props = BaseField & {
  options: Array<{ label: string; value: string }>;
};

export const FormRadio = ({ name, label, rules, disabled, options, className }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <Radio.Group {...field}>
            {options.map((option, idx) => (
              <Radio key={idx} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </>
      )}
    />
  );
};
