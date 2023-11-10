import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { type RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;
const dateFormat = 'MM/DD/YYYY';

export const FormDateRangePicker = ({ name, rules, required, placeholder, disabled, customClass }: Props) => {
  const { control } = useFormContext();
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= dayjs();
  };

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
              format={dateFormat}
              disabledDate={disabledDate}
              className="h-[52px] w-full rounded-lg text-[12px] font-normal"
              allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
            />
          </div>
        )}
      />
    </>
  );
};
