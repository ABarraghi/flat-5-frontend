import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BaseField } from './type';

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
        <div {...field} className={classNames('h-[40px] xl:h-[52px]', customClass)}>
          <Select defaultValue={defaultValue}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem value={option.key} key={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
