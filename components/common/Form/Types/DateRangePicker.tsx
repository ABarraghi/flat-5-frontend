import { Controller, useFormContext } from 'react-hook-form';
import { ConfigProvider, DatePicker } from 'antd';
import { type BaseField } from '@/components/common/Form/Types/type';
import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { type RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';
import CustomErrorMessage from '@/components/common/CustomErrorMessage';
import React from 'react';
import locale from 'antd/es/locale/en_US';

const { RangePicker } = DatePicker;

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;
const dateFormat = 'MM/DD/YYYY';

export const FormDateRangePicker = ({ name, rules, customClass, error }: Props) => {
  const { control } = useFormContext();
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current <= dayjs().subtract(1, 'day');
  };

  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div className={cn('relative', customClass)}>
            <ConfigProvider locale={locale}>
              <RangePicker
                {...field}
                format={dateFormat}
                disabledDate={disabledDate}
                className="h-[40px] w-full rounded-lg text-[12px] font-normal lg:min-w-[220px] xl:h-[52px]"
                allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: '15px', fontWeight: 'bold' }} /> }}
              />
            </ConfigProvider>
            {error && <CustomErrorMessage message={error} />}
          </div>
        )}
      />
    </>
  );
};
