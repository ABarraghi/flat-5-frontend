import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { type BaseField } from './type';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
        <RadioGroup defaultValue={field.value} onValueChange={field.onChange} className={classNames(customClass)}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} />
              <Label htmlFor={option.label}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
};
