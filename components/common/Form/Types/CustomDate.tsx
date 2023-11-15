import React, { useState } from 'react';
import { DatePicker, type DatePickerProps } from 'antd';
import cn from 'classnames';
import { type BaseField } from '@/components/common/Form/Types/type';
import { type Dayjs } from 'dayjs';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;

const CustomDate = ({ customClass }: Props) => {
  const [selectedRange, setSelectedRange] = useState<Array<Dayjs | null>>([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const dateFormat = 'MM/DD/YYYY';

  const handleDateChange = (dates: null | Array<Dayjs | null>) => {
    if (dates && dates.length > 0) {
      setSelectedRange([dates[0], !dates[1] ? dates[0] : dates[1]]);
    } else {
      setSelectedRange([]);
    }
    // if (!dates || dates.length === 0) {
    //   setSelectedRange(null);
    // } else {
    //   // Set the range with the same start and end date when only one date is selected
    //   setSelectedRange([dates[0], dates.length === 1 ? dates[0] : dates[1]]);
    // }
  };

  const handleConfirm = () => {
    if (selectedRange && selectedRange.length === 2) {
      const startDateString = selectedRange[0]?.format('MM/DD/YYYY');
      const endDateString = selectedRange[1]?.format('MM/DD/YYYY');
      console.log(`Selected Range: ${startDateString} - ${endDateString}`);
      // Update your input field or perform other actions
    }

    // Close the pop-over manually
    setPopoverVisible(false);
  };
  const customFormat: DatePickerProps['format'] = (value) => {
    return `${value.format(dateFormat)}`;
  };

  return (
    <div className={cn('relative max-w-[250px]', customClass)}>
      <DatePicker.RangePicker
        onCalendarChange={handleDateChange}
        format={customFormat}
        onChange={(dates) => handleDateChange(dates)}
        onOpenChange={(status) => setPopoverVisible(status)}
        open={popoverVisible}
        renderExtraFooter={() => (
          <div>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        )}
      />
    </div>
  );
};

export default CustomDate;
