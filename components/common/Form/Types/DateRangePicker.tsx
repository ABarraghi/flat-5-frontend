import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { type DateRange } from 'react-day-picker';
import cn from 'classnames';
import { format, setDate } from 'date-fns';
import { X, CalendarIcon } from 'lucide-react';
import { type BaseField } from '@/components/common/Form/Types/type';
import CustomErrorMessage from '@/components/common/CustomErrorMessage';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const DATE_FORMAT = 'MM/dd/yyyy';

type Props = {
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  customClass?: string;
} & BaseField;

export const FormDateRangePicker = ({ name, rules, customClass, error }: Props) => {
  const { control, reset, setValue } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control as any}
        rules={rules}
        render={({ field }) => (
          <div className={cn('relative', customClass)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className="h-[40px] w-full justify-start rounded-lg lg:min-w-[220px] xl:h-[52px]"
                >
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, DATE_FORMAT)} - {format(field.value.to, DATE_FORMAT)}{' '}
                      </>
                    ) : (
                      format(field.value.from, DATE_FORMAT)
                    )
                  ) : (
                    <>
                      <span className="text-muted-foreground">Select date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              {field.value && (
                <button
                  type="button"
                  className="absolute right-2 top-[15px]"
                  onClick={() => {
                    reset();
                  }}
                >
                  <X />
                </button>
              )}
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={{ before: new Date() }}
                  showOutsideDays
                />
              </PopoverContent>
            </Popover>
            {error && <CustomErrorMessage message={error} />}
          </div>
        )}
      />
    </>
  );
};
