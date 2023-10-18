import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { CloseOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
} & BaseField;

export const FormDateRangePicker = ({ name, rules, required, placeholder, disabled }: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div style={{ position: 'relative' }}>
            <RangePicker
              {...field}
              disabled={disabled}
              className="h-[40px] max-w-[250px] rounded-lg text-[12px] font-normal"
              allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
            />
          </div>
        )}
      />
    </>
  );
};
