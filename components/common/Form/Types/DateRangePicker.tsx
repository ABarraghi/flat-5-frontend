import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';

const { RangePicker } = DatePicker;

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;

export const FormDateRangePicker = ({ name, rules, required, placeholder, disabled, customClass }: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div className={cn('relative max-w-[250px]', customClass)}>
            <RangePicker
              {...field}
              disabled={disabled}
              className="h-[40px] w-full rounded-lg text-[12px] font-normal"
              allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
            />
          </div>
        )}
      />
    </>
  );
};
