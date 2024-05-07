import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BaseField } from './type';
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
        <div className={classNames('h-[40px] xl:h-[52px]', customClass)}>
          <Select {...field} defaultValue={defaultValue}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Default is rate" />
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
