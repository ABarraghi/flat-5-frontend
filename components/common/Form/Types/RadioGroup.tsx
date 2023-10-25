import { Controller, useFormContext } from 'react-hook-form';
import { type BaseField } from './type';
import { Radio } from 'antd';
import classNames from 'classnames';

type Props = BaseField & {
  options: Array<{ label: string; value: string }>;
  customClass?: string;
};

export const FormRadio = ({ name, rules, options, customClass }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <Radio.Group {...field} className={classNames(customClass)}>
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
