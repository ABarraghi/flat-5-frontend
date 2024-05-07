import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type BaseField } from './type';

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
          <RadioGroup {...field} className={classNames(customClass)}>
            {options.map((option, idx) => (
              <RadioGroupItem key={idx} value={option.value}>
                {option.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </>
      )}
    />
  );
};
