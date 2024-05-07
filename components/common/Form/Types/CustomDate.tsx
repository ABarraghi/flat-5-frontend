import { useState } from 'react';
import { type BaseField } from '@/components/common/Form/Types/type';
import { addDays, format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { cn } from '@/utils/common';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DATE_FORMAT = 'MM/dd/yyyy';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;

const CustomDate = ({ customClass }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn('relative max-w-[250px]', customClass)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, DATE_FORMAT)} - {format(date.to, DATE_FORMAT)}
                </>
              ) : (
                format(date.from, DATE_FORMAT)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
          <div>
            <Button>Confirm</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomDate;
